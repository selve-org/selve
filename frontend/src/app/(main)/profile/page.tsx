"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  UserCircleIcon,
  UserGroupIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  LinkIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";

import { TabNavigation } from "./components/TabNavigation";
import { GeneralTab } from "./components/tabs/GeneralTab";
import { SecurityPrivacyTab } from "./components/tabs/SecurityPrivacyTab";
import { AccountConnectionsTab } from "./components/tabs/AccountConnectionsTab";
import { SessionsTab } from "./components/tabs/SessionsTab";
import { InvitesTab } from "./components/tabs/InvitesTab";
import { PlanUsageTab } from "./components/tabs/PlanUsageTab";
import { useInvites } from "./hooks/useInvites";
import { TabType, Tab } from "./types";

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>("general");
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false);
  const [checkingAssessment, setCheckingAssessment] = useState(true);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  // Handle tab URL parameter
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['general', 'security', 'accounts', 'sessions', 'invites', 'plan'].includes(tabParam)) {
      setActiveTab(tabParam as TabType);
    }
  }, [searchParams]);

  const {
    invites,
    loading,
    remainingInvites,
    tier,
    fetchInvites,
    sendInvite,
    copyInviteLink,
    copiedCode,
  } = useInvites(user?.id);

  // Check if user has completed their assessment
  useEffect(() => {
    async function checkAssessmentStatus() {
      if (!user?.id) return;
      
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/assessment/current-result/${user.id}`;
        // Removed console.log for security - user ID should not be exposed in client console
        
        const response = await fetch(url);
        
        if (response.ok) {
          const data = await response.json();
          // Removed console.log for security - response data may contain sensitive user information
          setHasCompletedAssessment(!!data.current_result);
          if (data.current_result?.session_id) {
            setCurrentSessionId(data.current_result.session_id);
          }
        } else {
          console.error('Assessment check failed:', response.status);
        }
      } catch (error) {
        console.error("Failed to check assessment status:", error);
      } finally {
        setCheckingAssessment(false);
      }
    }
    
    if (isLoaded && user) {
      checkAssessmentStatus();
    }
  }, [isLoaded, user]);

  // Fetch invites when switching to invites tab
  useEffect(() => {
    if (isLoaded && user && activeTab === "invites") {
      fetchInvites();
    }
  }, [isLoaded, user, activeTab, fetchInvites]);

  const tabs: Tab[] = [
    { id: "general", label: "General", icon: UserCircleIcon },
    { id: "accounts", label: "Account Connections", icon: LinkIcon },
    { id: "sessions", label: "Sessions", icon: ComputerDesktopIcon },
    { id: "invites", label: "Invites", icon: UserGroupIcon },
    { id: "plan", label: "Plan & Usage", icon: CreditCardIcon },
    { id: "security", label: "Security & Privacy", icon: ShieldCheckIcon },
  ];

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0c0c0c]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0c0c0c]">
        <p className="text-gray-600 dark:text-gray-400">Please sign in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0c0c0c] text-gray-900 dark:text-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-gray-900 dark:text-gray-100">
          Settings
        </h1>

        {/* Tab Navigation */}
        <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Thin horizontal divider */}
        <div className="h-px bg-gray-200 dark:bg-gray-800 my-6 sm:my-8"></div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === "general" && (
            <GeneralTab 
              user={user} 
              tier={tier} 
              hasCompletedAssessment={hasCompletedAssessment}
              currentSessionId={currentSessionId}
            />
          )}

          {activeTab === "security" && <SecurityPrivacyTab />}

          {activeTab === "accounts" && <AccountConnectionsTab />}

          {activeTab === "sessions" && <SessionsTab />}

          {activeTab === "invites" && (
            <InvitesTab
              invites={invites}
              loading={loading}
              remainingInvites={remainingInvites}
              hasCompletedAssessment={hasCompletedAssessment}
              checkingAssessment={checkingAssessment}
              onSendInvite={sendInvite}
              onCopyLink={copyInviteLink}
              copiedCode={copiedCode}
            />
          )}

          {activeTab === "plan" && <PlanUsageTab tier={tier} invites={invites} />}
        </div>
      </div>
    </div>
  );
}
