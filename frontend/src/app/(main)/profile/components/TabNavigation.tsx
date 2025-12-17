import { useEffect, useRef, useState } from "react";
import { Tab, TabType } from "../types";

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function TabNavigation({ tabs, activeTab, onTabChange }: TabNavigationProps) {
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Update underline position when active tab changes
  useEffect(() => {
    const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const activeButton = tabRefs.current[activeIndex];

    if (activeButton) {
      const navElement = activeButton.parentElement;
      if (navElement) {
        const left = activeButton.offsetLeft;
        const width = activeButton.offsetWidth;
        setUnderlineStyle({ left, width });
      }
    }
  }, [activeTab, tabs]);

  return (
    <div className="relative">
      {/* Scrollable container */}
      <div className="relative overflow-x-auto scrollbar-hide">
        <nav className="relative flex space-x-6 sm:space-x-8 min-w-max" aria-label="Tabs" role="tablist">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                onClick={() => onTabChange(tab.id)}
                aria-selected={activeTab === tab.id}
                role="tab"
                className={`
                  flex items-center gap-2 py-3 px-1 font-medium text-sm transition-colors whitespace-nowrap relative cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 rounded-sm
                  ${
                    activeTab === tab.id
                      ? "text-purple-600 dark:text-purple-400"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}

          {/* Animated underline */}
          <div
            className="absolute bottom-0 h-0.5 bg-purple-600 dark:bg-purple-500 transition-all duration-300 ease-out"
            style={{
              left: `${underlineStyle.left}px`,
              width: `${underlineStyle.width}px`,
            }}
          />
        </nav>
      </div>

      {/* Fade gradient overlay on the right - positioned outside scrollable area */}
      <div className="absolute right-0 top-0 bottom-0 w-16 pointer-events-none bg-gradient-to-l from-white via-white/80 to-transparent dark:from-[#0c0c0c] dark:via-[#0c0c0c]/80 dark:to-transparent z-10" />
    </div>
  );
}
