// components/ProfileInsightsPanel.tsx
import React, { useState } from "react";

const ProfileInsightsPanel = () => {
  const [hoverStates, setHoverStates] = useState({
    back: false,
    middle: false,
    front: false,
  });

  const handleHover = (
    card: "back" | "middle" | "front",
    isHovering: boolean
  ) => {
    setHoverStates((prev) => ({ ...prev, [card]: isHovering }));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-[60px_40px] max-md:p-[40px_20px] font-['-apple-system',_BlinkMacSystemFont,_'Segoe_UI',_Roboto,_sans-serif]">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 gap-[60px] md:grid-cols-2 md:gap-[80px]">
        {/* Left Section (unchanged from previous version) */}
        <div className="p-0">
          <h2 className="text-[32px] font-semibold mb-4 text-white leading-[1.2]">
            Understand yourself end-to-end
          </h2>
          <p className="text-[16px] text-[#9ca3af] leading-[1.5] mb-[60px]">
            Gain clarity through structured assessments, insights, and trusted
            external feedback—all unified in a powerful personal profile.
          </p>

          {/* Project Card */}
          <div className="relative bg-[#111111] border border-[#2a2a2a] rounded-lg overflow-hidden">
            <div
              className="absolute top-0 left-0 w-[200px] h-[200px] pointer-events-none z-[1]"
              style={{
                background:
                  "radial-gradient(ellipse 150px 120px at 0% 0%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 30%, rgba(255, 255, 255, 0.01) 50%, transparent 80%)",
                borderRadius: "8px 0 0 0",
              }}
            />
            <div
              className="absolute top-0 left-0 w-[100px] h-[100px] pointer-events-none z-[2]"
              style={{
                background:
                  "radial-gradient(ellipse 80px 60px at 0% 0%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 40%, rgba(255, 255, 255, 0.01) 60%, transparent 90%)",
                borderRadius: "8px 0 0 0",
              }}
            />

            <div className="border-b border-[#2a2a2a] p-6 pb-5">
              <h3 className="text-[18px] font-semibold text-white">
                Profile Overview
              </h3>
            </div>

            <div className="p-0">
              <div className="border-b border-[#1a1a1a] p-5">
                <div className="text-[13px] text-[#6b7280] font-medium mb-3">
                  Status
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-[6px] h-[6px] rounded-full bg-[#f59e0b]"></span>
                    <span className="text-[14px] text-[#e5e7eb]">
                      Processing
                    </span>
                  </div>
                  <div className="bg-[#374151] text-[#9ca3af] px-2 py-1 rounded text-[12px] font-medium">
                    🎯 Self-Discovery
                  </div>
                </div>
              </div>

              <div className="border-b border-[#1a1a1a] p-5">
                <div className="text-[13px] text-[#6b7280] font-medium mb-3">
                  Sources
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 flex items-center justify-center text-[12px]">
                      🧠
                    </span>
                    <span className="text-[14px] text-[#e5e7eb]">
                      Core Assessment
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 flex items-center justify-center text-[12px]">
                      👥
                    </span>
                    <span className="text-[14px] text-[#e5e7eb]">
                      External Reflections
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="text-[13px] text-[#6b7280] font-medium mb-3">
                  Milestones
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 flex items-center justify-center text-[12px]">
                        ✅
                      </span>
                      <span className="text-[14px] text-[#e5e7eb]">
                        Self Input
                      </span>
                    </div>
                    <span className="text-[13px] text-[#9ca3af]">100%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 flex items-center justify-center text-[12px]">
                        🧩
                      </span>
                      <span className="text-[14px] text-[#e5e7eb]">
                        External Feedback
                      </span>
                    </div>
                    <span className="text-[13px] text-[#9ca3af]">3 of 5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 flex items-center justify-center text-[12px]">
                        🌟
                      </span>
                      <span className="text-[14px] text-[#e5e7eb]">
                        Profile Strength
                      </span>
                    </div>
                    <span className="text-[13px] text-[#9ca3af]">67%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right Section - Enhanced 3D Cards */}
        <div className="p-0">
          <h2 className="text-[32px] font-semibold mb-4 text-white leading-[1.2]">
            Profile Updates
          </h2>
          <p className="text-[16px] text-[#9ca3af] leading-[1.5] mb-[60px]">
            Track your self-discovery progress and profile alignment with
            real-time insights.
          </p>
          <div
            className="relative h-[280px] mt-10"
            style={{
              perspective: "1200px",
              perspectiveOrigin: "left center",
            }}
          >
            {/* Back Card */}
            <div
              className="absolute w-80 max-md:w-[280px] h-30 rounded-md p-4 transition-all duration-300"
              style={{
                bottom: hoverStates.back ? "75px" : "70px",
                right: hoverStates.back ? "25px" : "40px",
                zIndex: hoverStates.back ? 1 : 1,
                transform: `skewY(-5deg) ${
                  hoverStates.back
                    ? "translateY(-1px) translateZ(-15px) rotateY(-5deg) rotateX(1deg)"
                    : "translateY(-10px) translateZ(-50px) rotateY(-10deg) rotateX(3deg)"
                }`,
                filter: hoverStates.back
                  ? "grayscale(0%) blur(0px) brightness(1.3)"
                  : "grayscale(100%) blur(2px)",
                opacity: hoverStates.back ? 1 : 0.6,
                border: hoverStates.back ? "1px solid #ef4444" : "none",

                background: hoverStates.back
                  ? "linear-gradient(145deg, #2a1f1f 0%, #1a1515 100%)"
                  : "#1a1a1a",
                boxShadow: hoverStates.back
                  ? "0 15px 40px rgba(239, 68, 68, 0.3)"
                  : "0 0 10px rgba(0, 0, 0, 0.2)",

                transformStyle: "preserve-3d",
                transformOrigin: "left center",
              }}
              onMouseEnter={() => handleHover("back", true)}
              onMouseLeave={() => handleHover("back", false)}
            >
              <div
                className="absolute top-0 right-0 bottom-0 left-1/2 pointer-events-none rounded-r-md transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)",
                  opacity: hoverStates.back ? 0.3 : 1,
                }}
              />
              <div className="flex items-center gap-2 mb-2">
                <span className="w-[6px] h-[6px] rounded-full bg-[#ef4444]"></span>
                <span
                  className={`text-[14px] font-semibold transition-colors duration-300 ${
                    hoverStates.back ? "text-[#ef4444]" : "text-[#6b7280]"
                  }`}
                >
                  At risk
                </span>
              </div>
              <p
                className={`text-[13px] mb-3 leading-[1.3] transition-colors duration-300 ${
                  hoverStates.back ? "text-[#d1d5db]" : "text-[#4b5563]"
                }`}
              >
                Blind spots detected in peer feedback cycle.
              </p>
              <div
                className={`text-[12px] transition-colors duration-300 ${
                  hoverStates.back ? "text-[#9ca3af]" : "text-[#374151]"
                }`}
              >
                <div className="mb-0.5">Cycle 2</div>
              </div>
            </div>
            {/* Middle Card */}
            <div
              className="absolute w-80 max-md:w-[280px] h-30 rounded-md p-4 transition-all duration-300"
              style={{
                bottom: hoverStates.middle ? "40px" : "30px",
                right: hoverStates.middle ? "5px" : "20px",
                zIndex: hoverStates.middle ? 2 : 2,
                transform: `skewY(-5deg) ${
                  hoverStates.middle
                    ? "translateY(-10px) translateZ(-5px) rotateY(-3deg) rotateX(1deg)"
                    : "translateY(0px) translateZ(-20px) rotateY(-8deg) rotateX(2deg)"
                }`,
                filter: hoverStates.middle
                  ? "grayscale(0%) blur(0px) brightness(1.2)"
                  : "grayscale(80%) blur(1px)",
                opacity: hoverStates.middle ? 1 : 0.5,
                border: hoverStates.middle ? '1px solid #f59e0b' : 'none',

                background: hoverStates.middle
                  ? "linear-gradient(145deg, #2a241f 0%, #1f1e15 100%)"
                  : "#1a1a1a",
                boxShadow: hoverStates.middle
                  ? "0 15px 40px rgba(245, 158, 11, 0.3)"
                  : "none",
                transformStyle: "preserve-3d",
                transformOrigin: "left center",
              }}
              onMouseEnter={() => handleHover("middle", true)}
              onMouseLeave={() => handleHover("middle", false)}
            >
              <div
                className="absolute top-0 right-0 bottom-0 left-1/2 pointer-events-none rounded-r-md transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)",
                  opacity: hoverStates.middle ? 0.2 : 1,
                }}
              />
              <div className="flex items-center gap-2 mb-2">
                <span className="w-[6px] h-[6px] rounded-full bg-[#f59e0b]"></span>
                <span
                  className={`text-[14px] font-semibold transition-colors duration-300 ${
                    hoverStates.middle ? "text-[#f59e0b]" : "text-[#6b7280]"
                  }`}
                >
                  Processing
                </span>
              </div>
              <p
                className={`text-[13px] mb-3 leading-[1.3] transition-colors duration-300 ${
                  hoverStates.middle ? "text-[#d1d5db]" : "text-[#4b5563]"
                }`}
              >
                Waiting on more input from trusted peers.
              </p>
              <div
                className={`text-[12px] transition-colors duration-300 ${
                  hoverStates.middle ? "text-[#9ca3af]" : "text-[#374151]"
                }`}
              >
                <div className="mb-0.5">Sep 6</div>
              </div>
            </div>
            {/* Front Card */}
            <div
              className="absolute w-80 max-md:w-[280px] h-30 rounded-md p-4 transition-all duration-300"
              style={{
  bottom: hoverStates.front ? "0px" : "0px",
  right: hoverStates.front ? "-15px" : "0px",
  zIndex: 3,
  transform: `skewY(-5deg) ${
    hoverStates.front
      ? "translateY(-10px) translateZ(5px) rotateY(0deg) rotateX(0deg)"
      : "translateY(10px) translateZ(0px) rotateY(0deg) rotateX(0deg)"
  }`,
  filter: hoverStates.front ? "brightness(1.1)" : "none",
  boxShadow: hoverStates.front
    ? "0 15px 40px rgba(34, 197, 94, 0.3)"
    : "none",
  border: hoverStates.front ? "1px solid #22c55e" : "none",
  background: hoverStates.front
    ? "linear-gradient(145deg, #1f2a1f 0%, #151a15 100%)"
    : "#1a1a1a",
  transformStyle: "preserve-3d",
  transformOrigin: "left center",
}}

              onMouseEnter={() => handleHover("front", true)}
              onMouseLeave={() => handleHover("front", false)}
            >
              <div
                className="absolute top-0 right-0 bottom-0 left-1/2 pointer-events-none rounded-r-md"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%)",
                  opacity: 0.4,
                }}
              />
              <div className="flex items-center gap-2 mb-2 relative z-10">
                <span className="w-[6px] h-[6px] rounded-full bg-[#22c55e]"></span>
                <span className="text-[14px] font-semibold text-[#22c55e]">
                  On track
                </span>
              </div>
              <p className="text-[13px] text-[#d1d5db] mb-3 leading-[1.3] relative z-10">
                We are ready to launch next Thursday
              </p>
              <div className="text-[12px] text-[#6b7280] relative z-10">
                <div className="text-[#9ca3af] mb-0.5">Sep 8</div>
              </div>
            </div>{" "}
            {/* End of Front Card */}
          </div>{" "}
          {/* End of Card Container */}
        </div>{" "}
        {/* End of Right Section */}
      </div>
    </div>
  );
};

export default ProfileInsightsPanel;
