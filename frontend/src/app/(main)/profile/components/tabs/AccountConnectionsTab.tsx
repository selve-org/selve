"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { SettingsCard } from "../ui/SettingsCard";
import { Mail, Plus, Trash2, CheckCircle, AlertCircle, Star, Link2, Github } from "lucide-react";

// Provider icons mapping
const providerIcons: Record<string, React.ReactNode> = {
  google: (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  ),
  github: <Github className="w-5 h-5" />,
  facebook: (
    <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  twitter: (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path
        fill="#1DA1F2"
        d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
      />
    </svg>
  ),
};

const providerNames: Record<string, string> = {
  google: "Google",
  github: "GitHub",
  facebook: "Facebook",
  twitter: "Twitter",
  oauth_google: "Google",
  oauth_github: "GitHub",
  oauth_facebook: "Facebook",
  oauth_twitter: "Twitter",
};

export function AccountConnectionsTab() {
  const { user } = useUser();

  // Email state
  const [showAddEmail, setShowAddEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [emailSuccess, setEmailSuccess] = useState("");

  // OAuth state
  const [oauthLoading, setOauthLoading] = useState(false);
  const [oauthError, setOauthError] = useState("");
  const [oauthSuccess, setOauthSuccess] = useState("");

  // Get provider name from strategy
  const getProviderName = (strategy: string): string => {
    const provider = strategy.replace("oauth_", "");
    return providerNames[provider] || provider;
  };

  // Get provider icon
  const getProviderIcon = (strategy: string): React.ReactNode => {
    const provider = strategy.replace("oauth_", "");
    return (
      providerIcons[provider] || <Link2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
    );
  };

  // Handle adding new email
  const handleAddEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setEmailSuccess("");

    if (!newEmail || !newEmail.includes("@")) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setEmailLoading(true);

    try {
      await user?.createEmailAddress({ email: newEmail });
      setEmailSuccess("Email added! Check your inbox to verify.");
      setNewEmail("");
      setShowAddEmail(false);

      setTimeout(() => setEmailSuccess(""), 3000);
    } catch (error: any) {
      setEmailError(error.errors?.[0]?.message || "Failed to add email");
    } finally {
      setEmailLoading(false);
    }
  };

  // Handle removing email
  const handleRemoveEmail = async (emailAddressId: string) => {
    setEmailError("");
    setEmailLoading(true);

    try {
      const emailAddress = user?.emailAddresses.find(
        (e) => e.id === emailAddressId
      );
      await emailAddress?.destroy();
      setEmailSuccess("Email removed successfully");

      setTimeout(() => setEmailSuccess(""), 3000);
    } catch (error: any) {
      setEmailError(error.errors?.[0]?.message || "Failed to remove email");
    } finally {
      setEmailLoading(false);
    }
  };

  // Handle setting primary email
  const handleSetPrimary = async (emailAddressId: string) => {
    setEmailError("");
    setEmailLoading(true);

    try {
      const emailAddress = user?.emailAddresses.find(
        (e) => e.id === emailAddressId
      );
      await emailAddress?.setAsPrimary();
      setEmailSuccess("Primary email updated");

      setTimeout(() => setEmailSuccess(""), 3000);
    } catch (error: any) {
      setEmailError(error.errors?.[0]?.message || "Failed to set primary email");
    } finally {
      setEmailLoading(false);
    }
  };

  // Handle resending verification email
  const handleResendVerification = async (emailAddressId: string) => {
    setEmailError("");
    setEmailLoading(true);

    try {
      const emailAddress = user?.emailAddresses.find(
        (e) => e.id === emailAddressId
      );
      await emailAddress?.prepareVerification({ strategy: "email_code" });
      setEmailSuccess("Verification email sent! Check your inbox.");

      setTimeout(() => setEmailSuccess(""), 3000);
    } catch (error: any) {
      setEmailError(error.errors?.[0]?.message || "Failed to send verification");
    } finally {
      setEmailLoading(false);
    }
  };

  // Handle disconnecting OAuth account
  const handleDisconnect = async (externalAccountId: string, provider: string) => {
    if (
      !confirm(
        `Are you sure you want to disconnect your ${provider} account? You can reconnect it anytime.`
      )
    ) {
      return;
    }

    setOauthError("");
    setOauthLoading(true);

    try {
      const externalAccount = user?.externalAccounts.find(
        (acc) => acc.id === externalAccountId
      );
      await externalAccount?.destroy();
      setOauthSuccess(`${provider} account disconnected successfully`);

      setTimeout(() => setOauthSuccess(""), 3000);
    } catch (error: any) {
      setOauthError(error.errors?.[0]?.message || `Failed to disconnect ${provider} account`);
    } finally {
      setOauthLoading(false);
    }
  };

  // Available providers to connect
  const availableProviders = [
    { id: "oauth_google", name: "Google", icon: providerIcons.google },
    { id: "oauth_github", name: "GitHub", icon: providerIcons.github },
    { id: "oauth_facebook", name: "Facebook", icon: providerIcons.facebook },
    { id: "oauth_twitter", name: "Twitter", icon: providerIcons.twitter },
  ];

  // Get connected provider IDs
  const connectedProviderIds = user?.externalAccounts.map((acc) =>
    acc.verification?.strategy?.replace("oauth_", "")
  ) || [];

  return (
    <div className="space-y-6">
      {/* Email Addresses */}
      <SettingsCard title="Email Addresses" icon={Mail}>
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage the email addresses associated with your account. Your primary email
            will be used for important notifications.
          </p>

          {/* Success/Error Messages */}
          {emailError && (
            <div className="flex items-center gap-2 px-3 py-2 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-md">
              <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-600 dark:text-red-400">{emailError}</p>
            </div>
          )}

          {emailSuccess && (
            <div className="flex items-center gap-2 px-3 py-2 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/30 rounded-md">
              <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
              <p className="text-sm text-green-600 dark:text-green-400">{emailSuccess}</p>
            </div>
          )}

          {/* Email List */}
          <div className="space-y-3">
            {user?.emailAddresses.map((email) => (
              <div
                key={email.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#0c0c0c] rounded-lg border border-gray-200 dark:border-gray-800"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30 flex-shrink-0">
                    <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                        {email.emailAddress}
                      </p>
                      {email.id === user.primaryEmailAddressId && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-full flex-shrink-0">
                          <Star className="w-3 h-3" />
                          Primary
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {email.verification?.status === "verified" ? (
                        <span className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                          <CheckCircle className="w-3 h-3" />
                          Verified
                        </span>
                      ) : (
                        <button
                          onClick={() => handleResendVerification(email.id)}
                          disabled={emailLoading}
                          className="text-xs text-purple-600 dark:text-purple-400 hover:underline disabled:opacity-50"
                        >
                          Resend verification
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {email.id !== user.primaryEmailAddressId && (
                    <button
                      onClick={() => handleSetPrimary(email.id)}
                      disabled={emailLoading}
                      className="px-3 py-1.5 text-xs font-medium text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors disabled:opacity-50"
                    >
                      Make primary
                    </button>
                  )}

                  {email.id !== user.primaryEmailAddressId && (
                    <button
                      onClick={() => handleRemoveEmail(email.id)}
                      disabled={emailLoading}
                      className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md transition-colors disabled:opacity-50"
                      title="Remove email"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add Email Section */}
          {showAddEmail ? (
            <form onSubmit={handleAddEmail} className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                  New email address
                </label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-gray-800 rounded-md text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter email address"
                  autoFocus
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={emailLoading || !newEmail}
                  className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white rounded-md text-sm font-medium transition-colors"
                >
                  {emailLoading ? "Adding..." : "Add Email"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddEmail(false);
                    setNewEmail("");
                    setEmailError("");
                  }}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setShowAddEmail(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm font-medium transition-colors w-full sm:w-auto"
            >
              <Plus className="w-4 h-4" />
              Add Email Address
            </button>
          )}
        </div>
      </SettingsCard>

      {/* Connected Accounts */}
      <SettingsCard title="Connected Accounts" icon={Link2}>
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Connect your account with third-party services for easier sign-in and enhanced
            features.
          </p>

          {/* Success/Error Messages */}
          {oauthError && (
            <div className="flex items-center gap-2 px-3 py-2 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-md">
              <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-600 dark:text-red-400">{oauthError}</p>
            </div>
          )}

          {oauthSuccess && (
            <div className="flex items-center gap-2 px-3 py-2 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/30 rounded-md">
              <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
              <p className="text-sm text-green-600 dark:text-green-400">{oauthSuccess}</p>
            </div>
          )}

          {/* Connected Accounts */}
          {user?.externalAccounts && user.externalAccounts.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Connected
              </h4>
              {user.externalAccounts.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#0c0c0c] rounded-lg border border-gray-200 dark:border-gray-800"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                      {getProviderIcon(account.verification?.strategy || "")}
                    </div>

                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {getProviderName(account.verification?.strategy || "")}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {account.emailAddress || account.username || "Connected"}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      handleDisconnect(
                        account.id,
                        getProviderName(account.verification?.strategy || "")
                      )
                    }
                    disabled={oauthLoading}
                    className="px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md transition-colors disabled:opacity-50"
                  >
                    Disconnect
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Available to Connect */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Available to Connect
            </h4>

            {availableProviders
              .filter(
                (provider) =>
                  !connectedProviderIds.includes(provider.id.replace("oauth_", ""))
              )
              .map((provider) => (
                <div
                  key={provider.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#0c0c0c] rounded-lg border border-gray-200 dark:border-gray-800"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                      {provider.icon}
                    </div>

                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {provider.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Not connected
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={async () => {
                      setOauthError("");
                      setOauthLoading(true);
                      try {
                        await user?.createExternalAccount({
                          strategy: provider.id as any,
                          redirectUrl: window.location.href,
                        });
                      } catch (error: any) {
                        setOauthError(
                          error.errors?.[0]?.message ||
                            `Failed to connect ${provider.name}`
                        );
                      } finally {
                        setOauthLoading(false);
                      }
                    }}
                    disabled={oauthLoading}
                    className="px-3 py-1.5 text-sm font-medium text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors disabled:opacity-50"
                  >
                    Connect
                  </button>
                </div>
              ))}

            {availableProviders.every((provider) =>
              connectedProviderIds.includes(provider.id.replace("oauth_", ""))
            ) && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <CheckCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">All available accounts are connected</p>
              </div>
            )}
          </div>
        </div>
      </SettingsCard>
    </div>
  );
}
