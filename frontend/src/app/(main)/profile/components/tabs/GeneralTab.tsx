import { useState, useEffect, useRef } from "react";
import { User } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import Link from "next/link";
import { toast } from "sonner";
import { SettingsCard } from "../ui/SettingsCard";
import { TierType } from "../../types";
import { Sun, Moon, Monitor, Palette, ArrowRight, Pencil, Check, X, Upload } from "lucide-react";

interface GeneralTabProps {
  user: {
    id: string;
    fullName: string | null;
    emailAddresses: { emailAddress: string }[];
    imageUrl?: string;
  };
  tier: TierType;
  hasCompletedAssessment?: boolean;
  currentSessionId?: string | null;
}

export function GeneralTab({ user, tier, hasCompletedAssessment, currentSessionId }: GeneralTabProps) {
  const { user: clerkUser } = useUser();
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [savingName, setSavingName] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [uploadingPicture, setUploadingPicture] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const response = await fetch(`${backendUrl}/api/users/profile`, {
          headers: {
            "X-User-ID": user.id,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserName(data.name || user.fullName || null);
          setProfilePicture(data.profilePicture || null);
        } else {
          // Fallback to Clerk's name if backend fetch fails
          setUserName(user.fullName);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        // Fallback to Clerk's name
        setUserName(user.fullName);
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, [user.id, user.fullName]);

  const handleEditName = () => {
    setEditedName(userName || "");
    setIsEditingName(true);
  };

  const handleSaveName = async () => {
    if (!editedName.trim()) return;
    
    setSavingName(true);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${backendUrl}/api/users/name`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-User-ID": user.id,
        },
        body: JSON.stringify({ name: editedName.trim() }),
      });

      if (response.ok) {
        const data = await response.json();
        setUserName(data.name);
        setIsEditingName(false);
        
        // Reload Clerk user to refresh the name in the header
        if (clerkUser) {
          await clerkUser.reload();
        }
        
        toast.success("Name updated successfully");
      } else {
        const error = await response.json();
        toast.error(error.detail || "Failed to update name");
      }
    } catch (error) {
      console.error("Error updating name:", error);
      toast.error("Failed to update name");
    } finally {
      setSavingName(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingName(false);
    setEditedName("");
  };

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    setUploadingPicture(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${backendUrl}/api/users/profile-picture`, {
        method: "POST",
        headers: {
          "X-User-ID": user.id,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setProfilePicture(data.profilePicture);
        toast.success("Profile picture updated successfully");
      } else {
        const error = await response.json();
        toast.error(error.detail || "Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploadingPicture(false);
    }
  };

  // Get initials for avatar
  const getInitials = () => {
    if (userName) {
      return userName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return user.fullName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";
  };

  // Theme options
  const themeOptions = [
    {
      id: "light",
      label: "Light",
      description: "Light theme all the time",
      icon: Sun,
    },
    {
      id: "system",
      label: "Match system",
      description: "Follow the system preference",
      icon: Monitor,
    },
    {
      id: "dark",
      label: "Dark",
      description: "Dark theme all the time",
      icon: Moon,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Assessment Results Section */}
      <SettingsCard title="Your Assessment">
        {hasCompletedAssessment && currentSessionId ? (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                You&apos;ve completed your personality assessment
              </p>
              <p className="text-gray-900 dark:text-gray-100">
                View your full personality profile and insights
              </p>
            </div>
            <Link
              href={`/results/${currentSessionId}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm font-medium transition-colors"
            >
              <span>View Results</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Discover your personality profile
              </p>
              <p className="text-gray-900 dark:text-gray-100">
                Take the assessment to uncover your unique traits
              </p>
            </div>
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm font-medium transition-colors"
            >
              <span>Start Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </SettingsCard>

      {/* Profile Section */}
      <SettingsCard title="Profile">
        <div className="flex items-center gap-6 mb-6">
          {/* Profile Picture with Edit Overlay */}
          <div className="relative group">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            {profilePicture ? (
              <div className="relative">
                <img
                  src={profilePicture}
                  alt={userName || "Profile"}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <button
                  onClick={handleProfilePictureClick}
                  disabled={uploadingPicture}
                  title="Change profile picture"
                  className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer disabled:cursor-wait"
                >
                  {uploadingPicture ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Pencil className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>
            ) : (
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white text-2xl font-semibold">
                  {getInitials()}
                </div>
                <button
                  onClick={handleProfilePictureClick}
                  disabled={uploadingPicture}
                  title="Upload profile picture"
                  className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer disabled:cursor-wait"
                >
                  {uploadingPicture ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Upload className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Name Field */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Full name</span>
            </div>
            {loading ? (
              <div className="w-full px-3 py-2 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 rounded-md">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            ) : isEditingName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  placeholder="Enter your name"
                  disabled={savingName}
                  className="flex-1 px-3 py-2 bg-white dark:bg-[#0c0c0c] border-2 border-purple-500 dark:border-purple-600 rounded-md text-gray-900 dark:text-gray-100 focus:outline-none focus:border-purple-600 dark:focus:border-purple-500 disabled:opacity-60"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveName();
                    if (e.key === "Escape") handleCancelEdit();
                  }}
                />
                <button
                  onClick={handleSaveName}
                  disabled={savingName || !editedName.trim()}
                  title="Save"
                  className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {savingName ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={handleCancelEdit}
                  disabled={savingName}
                  title="Cancel"
                  className="p-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors disabled:opacity-50"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={userName || ""}
                  disabled
                  placeholder="Click the pencil to add your name"
                  className="flex-1 px-3 py-2 bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-gray-800 rounded-md text-gray-900 dark:text-gray-100 disabled:opacity-60 placeholder:text-gray-400 dark:placeholder:text-gray-600"
                />
                <button
                  onClick={handleEditName}
                  title="Edit name"
                  className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors cursor-pointer"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
              Email address
            </label>
            <input
              type="email"
              value={user.emailAddresses[0]?.emailAddress || ""}
              disabled
              className="w-full px-3 py-2 bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-gray-800 rounded-md text-gray-900 dark:text-gray-100 disabled:opacity-60"
            />
          </div>
        </div>
      </SettingsCard>

      {/* Account Tier */}
      <SettingsCard title="Account Tier">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current plan</p>
            <p className="text-xl font-semibold capitalize text-gray-900 dark:text-gray-100">
              {tier === "free" ? "Free" : "Premium"}
            </p>
          </div>
          {tier === "free" && (
            /* COMING SOON: Premium upgrade functionality */
            <button 
              disabled 
              title="Coming soon"
              className="px-4 py-2 bg-purple-600/50 text-white/70 rounded-md text-sm font-medium cursor-not-allowed"
            >
              Upgrade to Premium
            </button>
            /* END COMING SOON */
          )}
        </div>
      </SettingsCard>

      {/* Theme Selector */}
      <SettingsCard title="Appearance" icon={Palette}>
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Choose how SELVE looks to you. Select a single theme, or sync with your system
            and automatically switch between day and night themes.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {themeOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = theme === option.id;

              return (
                <button
                  key={option.id}
                  onClick={() => setTheme(option.id)}
                  className={`relative p-4 rounded-lg border-2 transition-all text-left cursor-pointer hover:cursor-pointer ${
                    isSelected
                      ? "border-purple-600 dark:border-purple-500 bg-purple-50 dark:bg-purple-950/20"
                      : "border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0c0c0c] hover:border-purple-300 dark:hover:border-purple-700"
                  }`}
                >
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div
                      className={`w-12 h-12 flex items-center justify-center rounded-full ${
                        isSelected
                          ? "bg-purple-600 dark:bg-purple-500 text-white"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div>
                      <p
                        className={`font-medium ${
                          isSelected
                            ? "text-purple-900 dark:text-purple-100"
                            : "text-gray-900 dark:text-gray-100"
                        }`}
                      >
                        {option.label}
                      </p>
                      <p
                        className={`text-xs mt-1 ${
                          isSelected
                            ? "text-purple-700 dark:text-purple-300"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {option.description}
                      </p>
                    </div>

                    {isSelected && (
                      <div className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center rounded-full bg-purple-600 dark:bg-purple-500">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </SettingsCard>
    </div>
  );
}
