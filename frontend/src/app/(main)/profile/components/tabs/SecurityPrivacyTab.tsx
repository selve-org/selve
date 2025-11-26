"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { SettingsCard } from "../ui/SettingsCard";
import {
  Eye,
  EyeOff,
  Shield,
  Lock,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  Trash2,
} from "lucide-react";

export function SecurityPrivacyTab() {
  const { user } = useUser();
  const router = useRouter();

  // Password state
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // 2FA state
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [twoFactorLoading, setTwoFactorLoading] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [twoFactorError, setTwoFactorError] = useState("");

  // Delete account state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  // Handle password update
  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess(false);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }

    setPasswordLoading(true);

    try {
      await user?.updatePassword({
        currentPassword,
        newPassword,
      });

      setPasswordSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (error: any) {
      setPasswordError(error.errors?.[0]?.message || "Failed to update password");
    } finally {
      setPasswordLoading(false);
    }
  };

  // Handle 2FA toggle
  const handleTwoFactorToggle = async () => {
    if (twoFactorEnabled) {
      setTwoFactorLoading(true);
      setTwoFactorError("");

      try {
        await user?.disableTOTP();
        setTwoFactorEnabled(false);
        setShowQRCode(false);
      } catch (error: any) {
        setTwoFactorError(error.errors?.[0]?.message || "Failed to disable 2FA");
      } finally {
        setTwoFactorLoading(false);
      }
    } else {
      setTwoFactorLoading(true);
      setTwoFactorError("");

      try {
        const totp = await user?.createTOTP();
        if (totp) {
          setQrCodeUrl(totp.qrCodeUrl || "");
          setShowQRCode(true);
        }
      } catch (error: any) {
        setTwoFactorError(error.errors?.[0]?.message || "Failed to enable 2FA");
      } finally {
        setTwoFactorLoading(false);
      }
    }
  };

  // Handle 2FA verification
  const handleVerifyTOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setTwoFactorLoading(true);
    setTwoFactorError("");

    try {
      await user?.verifyTOTP({ code: verificationCode });
      setTwoFactorEnabled(true);
      setShowQRCode(false);
      setVerificationCode("");
    } catch (error: any) {
      setTwoFactorError(error.errors?.[0]?.message || "Invalid verification code");
    } finally {
      setTwoFactorLoading(false);
    }
  };

  // Handle delete account
  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== "DELETE") {
      setDeleteError('Please type "DELETE" to confirm');
      return;
    }

    setDeleting(true);
    setDeleteError("");

    try {
      await user?.delete();
      router.push("/");
    } catch (error: any) {
      setDeleteError(error.errors?.[0]?.message || "Failed to delete account");
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Password Section */}
      <SettingsCard title="Password" icon={Lock}>
        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          {/* Current Password */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
              Current password
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3 py-2 pr-10 bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-gray-800 rounded-md text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
                aria-label={showCurrentPassword ? "Hide password" : "Show password"}
              >
                {showCurrentPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
              New password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 pr-10 bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-gray-800 rounded-md text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter new password (min 8 characters)"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
                aria-label={showNewPassword ? "Hide password" : "Show password"}
              >
                {showNewPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
              Confirm new password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 pr-10 bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-gray-800 rounded-md text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Error/Success Messages */}
          {passwordError && (
            <div className="flex items-center gap-2 px-3 py-2 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-md">
              <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-600 dark:text-red-400">{passwordError}</p>
            </div>
          )}

          {passwordSuccess && (
            <div className="flex items-center gap-2 px-3 py-2 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/30 rounded-md">
              <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
              <p className="text-sm text-green-600 dark:text-green-400">
                Password updated successfully
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={passwordLoading}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white rounded-md text-sm font-medium transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              {passwordLoading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </SettingsCard>

      {/* Two-Factor Authentication */}
      <SettingsCard title="Two-Factor Authentication" icon={Shield}>
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Add an extra layer of security to your account. You'll need to enter a code
            from your authenticator app when signing in.
          </p>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#0c0c0c] rounded-lg border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  Authenticator App
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {twoFactorEnabled ? "Enabled" : "Not enabled"}
                </p>
              </div>
            </div>

            <button
              onClick={handleTwoFactorToggle}
              disabled={twoFactorLoading}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                twoFactorEnabled
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-purple-600 hover:bg-purple-700 text-white"
              } disabled:opacity-50`}
            >
              {twoFactorLoading
                ? "Loading..."
                : twoFactorEnabled
                ? "Disable"
                : "Enable"}
            </button>
          </div>

          {/* QR Code Setup */}
          {showQRCode && (
            <div className="p-4 bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/30 rounded-lg space-y-4">
              <h4 className="font-medium text-gray-900 dark:text-gray-100">
                Scan QR Code
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Scan this QR code with your authenticator app (Google Authenticator,
                Authy, etc.)
              </p>

              {qrCodeUrl && (
                <div className="flex justify-center">
                  <img
                    src={qrCodeUrl}
                    alt="2FA QR Code"
                    className="w-48 h-48 border-4 border-white dark:border-gray-900 rounded-lg"
                  />
                </div>
              )}

              <form onSubmit={handleVerifyTOTP} className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Verification code
                  </label>
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-gray-800 rounded-md text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                  />
                </div>

                {twoFactorError && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-md">
                    <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0" />
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {twoFactorError}
                    </p>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={twoFactorLoading || verificationCode.length !== 6}
                    className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white rounded-md text-sm font-medium transition-colors cursor-pointer disabled:cursor-not-allowed"
                  >
                    {twoFactorLoading ? "Verifying..." : "Verify & Enable"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowQRCode(false)}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md text-sm font-medium transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </SettingsCard>

      {/* Privacy Settings */}
      <SettingsCard title="Privacy Settings">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Privacy controls coming soon. Your data is always kept secure and private.
        </p>
      </SettingsCard>

      {/* Danger Zone */}
      <SettingsCard title="Danger Zone" icon={AlertTriangle}>
        <div className="space-y-4">
          <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30 flex-shrink-0">
                <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>

              <div className="flex-1">
                <h4 className="font-medium text-red-900 dark:text-red-100 mb-1">
                  Delete Account
                </h4>
                <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                  Permanently delete your account and all associated data. This action
                  cannot be undone.
                </p>

                {!showDeleteConfirm ? (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors cursor-pointer"
                  >
                    Delete Account
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div className="p-3 bg-red-100 dark:bg-red-900/40 border border-red-300 dark:border-red-800 rounded-md">
                      <p className="text-sm text-red-900 dark:text-red-100 font-medium mb-2">
                        Are you absolutely sure?
                      </p>
                      <p className="text-sm text-red-800 dark:text-red-200 mb-3">
                        This will permanently delete your account, including:
                      </p>
                      <ul className="text-sm text-red-800 dark:text-red-200 list-disc list-inside space-y-1 mb-3">
                        <li>Your profile and personality assessment</li>
                        <li>All invites you've sent and received</li>
                        <li>Your usage history and settings</li>
                        <li>All other personal data</li>
                      </ul>
                      <p className="text-sm text-red-900 dark:text-red-100 font-medium">
                        Type <span className="font-mono font-bold">DELETE</span> to
                        confirm:
                      </p>
                    </div>

                    <input
                      type="text"
                      value={deleteConfirmText}
                      onChange={(e) => setDeleteConfirmText(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-[#0c0c0c] border border-red-300 dark:border-red-800 rounded-md text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Type DELETE"
                      autoFocus
                    />

                    {deleteError && (
                      <div className="flex items-center gap-2 px-3 py-2 bg-red-100 dark:bg-red-900/40 border border-red-300 dark:border-red-800 rounded-md">
                        <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0" />
                        <p className="text-sm text-red-600 dark:text-red-400">
                          {deleteError}
                        </p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={handleDeleteAccount}
                        disabled={deleting || deleteConfirmText !== "DELETE"}
                        className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-md text-sm font-medium transition-colors cursor-pointer disabled:cursor-not-allowed"
                      >
                        {deleting ? "Deleting..." : "Delete My Account"}
                      </button>
                      <button
                        onClick={() => {
                          setShowDeleteConfirm(false);
                          setDeleteConfirmText("");
                          setDeleteError("");
                        }}
                        disabled={deleting}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md text-sm font-medium transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </SettingsCard>
    </div>
  );
}
