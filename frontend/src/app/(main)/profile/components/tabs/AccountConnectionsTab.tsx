"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { SettingsCard } from "../ui/SettingsCard";
import { Mail, Plus, Trash2, CheckCircle, AlertCircle, Star, Link2 } from "lucide-react";

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
  linkedin: (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path
        fill="#0A66C2"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  ),
};

const providerNames: Record<string, string> = {
  google: "Google",
  linkedin: "LinkedIn",
  linkedin_oidc: "LinkedIn",
  oauth_google: "Google",
  oauth_linkedin: "LinkedIn",
  oauth_linkedin_oidc: "LinkedIn",
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

    if (!user) {
      setEmailError("User not loaded");
      return;
    }

    setEmailLoading(true);

    try {
      await user.createEmailAddress({ email: newEmail });
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

    const emailAddress = user?.emailAddresses.find(
      (e) => e.id === emailAddressId
    );
    if (!emailAddress) {
      setEmailError("Email not found");
      return;
    }

    setEmailLoading(true);

    try {
      await emailAddress.destroy();
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

    if (!user) {
      setEmailError("User not loaded");
      return;
    }

    setEmailLoading(true);

    try {
      await user.update({ primaryEmailAddressId: emailAddressId });
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

    const emailAddress = user?.emailAddresses.find(
      (e) => e.id === emailAddressId
    );
    if (!emailAddress) {
      setEmailError("Email not found");
      return;
    }

    setEmailLoading(true);

    try {
      await emailAddress.prepareVerification({ strategy: "email_code" });
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

    const externalAccount = user?.externalAccounts.find(
      (acc) => acc.id === externalAccountId
    );
    if (!externalAccount) {
      setOauthError("Account not found");
      return;
    }

    setOauthLoading(true);

    try {
      await externalAccount.destroy();
      setOauthSuccess(`${provider} account disconnected successfully`);

      setTimeout(() => setOauthSuccess(""), 3000);
    } catch (error: any) {
      setOauthError(error.errors?.[0]?.message || `Failed to disconnect ${provider} account`);
    } finally {
      setOauthLoading(false);
    }
  };

  // Available providers to connect (configured in Clerk dashboard for production)
  const availableProviders = [
    { id: "oauth_google", name: "Google", icon: providerIcons.google },
    { id: "oauth_linkedin_oidc", name: "LinkedIn", icon: providerIcons.linkedin },
  ];

  // Get connected provider IDs (filter out undefined strategies)
  const connectedProviderIds = user?.externalAccounts
    .map((acc) => acc.verification?.strategy)
    .filter(Boolean)
    .map((s) => s!.replace("oauth_", "")) || [];

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
                          className="text-xs text-purple-600 dark:text-purple-400 hover:underline disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
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
                      className="px-3 py-1.5 text-xs font-medium text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                    >
                      Make primary
                    </button>
                  )}

                  {email.id !== user.primaryEmailAddressId && (
                    <button
                      onClick={() => handleRemoveEmail(email.id)}
                      disabled={emailLoading}
                      className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                      title="Remove email"
                      aria-label="Remove email address"
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
                  className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white rounded-md text-sm font-medium transition-colors cursor-pointer disabled:cursor-not-allowed"
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
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md text-sm font-medium transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setShowAddEmail(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm font-medium transition-colors w-full sm:w-auto cursor-pointer"
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
                    className="px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
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
                      
                      console.log(`[OAuth] Attempting to connect ${provider.name} (${provider.id})`);
                      
                      try {
                        await user?.createExternalAccount({
                          strategy: provider.id as any,
                          redirectUrl: window.location.href,
                        });
                        console.log(`[OAuth] Successfully initiated ${provider.name} connection`);
                      } catch (error: any) {
                        // Log detailed error for debugging
                        console.error(`[OAuth] Failed to connect ${provider.name}:`, {
                          provider: provider.id,
                          errorCode: error.errors?.[0]?.code,
                          errorMessage: error.errors?.[0]?.message,
                          longMessage: error.errors?.[0]?.longMessage,
                          fullError: error,
                        });
                        
                        // Check if provider is not enabled in Clerk dashboard
                        const errorMessage = error.errors?.[0]?.message || "";
                        if (
                          errorMessage.includes("not enabled") ||
                          errorMessage.includes("strategy is not supported") ||
                          error.errors?.[0]?.code === "form_identifier_not_found"
                        ) {
                          setOauthError(
                            `${provider.name} connection is not available in this environment. Please try in production.`
                          );
                        } else {
                          setOauthError(
                            errorMessage || `Failed to connect ${provider.name}. Please try again.`
                          );
                        }
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
