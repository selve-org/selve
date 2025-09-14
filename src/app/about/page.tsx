"use client";

import React, { useRef, useEffect, useCallback } from "react";

// --- SVG Icon Components ---
const ShieldCheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-8 h-8 text-white"
  >
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
    <path d="m9 12 2 2 4-4"></path>
  </svg>
);

const FastForwardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-8 h-8 text-white"
  >
    <polygon points="13 19 22 12 13 5 13 19"></polygon>
    <polygon points="2 19 11 12 2 5 2 19"></polygon>
  </svg>
);

const GlobeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-8 h-8 text-white"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
    <path d="M2 12h20"></path>
  </svg>
);

const PercentIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-8 h-8 text-white"
  >
    <line x1="19" x2="5" y1="5" y2="19"></line>
    <circle cx="6.5" cy="6.5" r="2.5"></circle>
    <circle cx="17.5" cy="17.5" r="2.5"></circle>
  </svg>
);

// --- SpotlightCard Component ---
const SpotlightCard = ({ icon, title, description, styleProps }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const updateGlow = (e: any) => {
      card.style.setProperty("--glow-opacity", "1");
      const rect = card.getBoundingClientRect();
      let clientX, clientY;

      if (e.touches) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      card.style.setProperty("--x", clientX);
      card.style.setProperty("--y", clientY);

      const xInCard = clientX - rect.left;
      const xp = xInCard / rect.width;
      card.style.setProperty("--xp", xp.toString());
    };

    const turnOffGlow = () => {
      card.style.setProperty("--glow-opacity", "0");
    };

    card.addEventListener("mousemove", updateGlow);
    card.addEventListener("mouseleave", turnOffGlow);
    card.addEventListener("touchmove", updateGlow, { passive: false });
    card.addEventListener("touchend", turnOffGlow);
    card.addEventListener("touchcancel", turnOffGlow);

    return () => {
      card.removeEventListener("mousemove", updateGlow);
      card.removeEventListener("mouseleave", turnOffGlow);
      card.removeEventListener("touchmove", updateGlow);
      card.removeEventListener("touchend", turnOffGlow);
      card.removeEventListener("touchcancel", turnOffGlow);
    };
  }, []);

  const cardStyle = {
    "--base": styleProps.base,
    "--spread": styleProps.spread,
    "--radius": 16,
    "--border": 1,
    "--backdrop": "hsl(0 0% 100% / 0.05)",
    "--backup-border": "hsl(0 0% 100% / 0.1)",
    "--size": 200,
    "--outer": 1,
    "--border-size": "calc(var(--border, 2) * 1px)",
    "--spotlight-size": "calc(var(--size, 150) * 1px)",
    "--hue": "calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))",
    backgroundImage:
      "radial-gradient(var(--spotlight-size) var(--spotlight-size) at calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px), hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.1)), transparent)",
    backgroundColor: "var(--backdrop, transparent)",
    backgroundSize:
      "calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))",
    backgroundPosition: "50% 50%",
    backgroundAttachment: "fixed",
    border: "var(--border-size) solid var(--backup-border)",
    position: "relative" as const,
    touchAction: "none" as const,
  };

  return (
    <div className="h-full">
      <div
        ref={cardRef}
        data-glow="true"
        className="relative rounded-2xl backdrop-blur-lg p-8 h-full"
        style={cardStyle}
      >
        <div data-glow="true"></div>
        <div className="relative z-10 h-full">
          <div className="text-center flex flex-col items-center justify-center h-full">
            <div className="flex items-center justify-center h-16 w-16 mx-auto bg-white/10 rounded-full">
              {icon}
            </div>
            <h3 className="mt-6 text-xl font-semibold text-white">{title}</h3>
            <p className="mt-2 text-base text-gray-400 max-w-xs mx-auto">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Canvas Button Component ---
interface CanvasButtonConfig {
  text: string;
  url: string;
  font: string;
  padding: { x: number; y: number };
  colors: {
    text: string;
    focusRing: string;
    focusOffset: string;
  };
  ringWidth: number;
  ringOffset: number;
}

interface ButtonState {
  isHovering: boolean;
  isMouseDown: boolean;
}

const CanvasButton: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useRef<ButtonState>({
    isHovering: false,
    isMouseDown: false,
  });

  // --- Configuration ---
  const config: CanvasButtonConfig = {
    text: "Get Started - It's free",
    url: "https://heyboss.ai/login",
    font: "bold 18px sans-serif",
    padding: { x: 32, y: 16 },
    colors: {
      text: "#FFFFFF",
      focusRing: "#FFFFFF",
      focusOffset: "#000000",
    },
    ringWidth: 2,
    ringOffset: 2,
  };

  // --- Drawing Logic ---
  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, time: number) => {
      // Calculate dimensions
      ctx.font = config.font;
      const textMetrics = ctx.measureText(config.text);
      const buttonWidth = textMetrics.width + config.padding.x * 2;
      const buttonHeight = 18 + config.padding.y * 2;
      const buttonRadius = buttonHeight / 2;
      const canvasPadding = 25;
      const buttonX = canvasPadding;
      const buttonY = canvasPadding;

      // Set canvas dimensions (doing it here handles HD-DPI screens)
      const dpr = window.devicePixelRatio || 1;
      const canvasWidth = buttonWidth + canvasPadding * 2;
      const canvasHeight = buttonHeight + canvasPadding * 2;
      if (ctx.canvas.width !== canvasWidth * dpr) {
        ctx.canvas.width = canvasWidth * dpr;
        ctx.canvas.height = canvasHeight * dpr;
        ctx.canvas.style.width = `${canvasWidth}px`;
        ctx.canvas.style.height = `${canvasHeight}px`;
        ctx.scale(dpr, dpr);
      }

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // --- Create the new purple/dark color gradient ---
      // The hue oscillates around purple (270) in a range of blue-purple to pink-purple
      const hue = 270 + Math.sin(time / 2000) * 30;

      // 1. Draw Animated Glow Effect
      if (state.current.isHovering) {
        ctx.shadowColor = `hsl(${hue}, 100%, 70%)`;
        ctx.shadowBlur = 25;
      }

      // 2. Draw Focus Ring
      if (state.current.isMouseDown) {
        const totalOffset = config.ringWidth + config.ringOffset;
        ctx.fillStyle = config.colors.focusOffset;
        drawRoundedRect(
          ctx,
          buttonX - totalOffset,
          buttonY - totalOffset,
          buttonWidth + totalOffset * 2,
          buttonHeight + totalOffset * 2,
          buttonRadius + totalOffset
        );
        ctx.fill();
        ctx.fillStyle = config.colors.focusRing;
        drawRoundedRect(
          ctx,
          buttonX - config.ringOffset,
          buttonY - config.ringOffset,
          buttonWidth + config.ringOffset * 2,
          buttonHeight + config.ringOffset * 2,
          buttonRadius + config.ringOffset
        );
        ctx.fill();
      }

      // 3. Draw the Button Body
      if (state.current.isHovering) {
        // Draw the Animated Gradient Button Body when hovering
        const gradient = ctx.createLinearGradient(
          buttonX,
          buttonY,
          buttonX + buttonWidth,
          buttonY
        );
        gradient.addColorStop(0, `hsl(${hue - 20}, 100%, 55%)`); // Darker purple-blue
        gradient.addColorStop(0.5, `hsl(${hue}, 100%, 50%)`); // Mid purple
        gradient.addColorStop(1, `hsl(${hue + 20}, 100%, 55%)`); // Darker purple-pink
        ctx.fillStyle = gradient;
      } else {
        // Draw static white background when not hovering
        ctx.fillStyle = "#FFFFFF";
      }

      drawRoundedRect(
        ctx,
        buttonX,
        buttonY,
        buttonWidth,
        buttonHeight,
        buttonRadius
      );
      ctx.fill();

      // Reset shadow
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;

      // 4. Draw the Text
      ctx.fillStyle = state.current.isHovering ? config.colors.text : "#000000"; // White text on gradient, black text on white background
      ctx.font = config.font;
      ctx.shadowColor = state.current.isHovering
        ? "rgba(0, 0, 0, 0.5)"
        : "rgba(255, 255, 255, 0.3)"; // Adjust shadow for contrast
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        config.text,
        buttonX + buttonWidth / 2,
        buttonY + buttonHeight / 2 + 1
      );

      // Reset shadow
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    },
    [config]
  );

  // Helper function to draw a rounded rectangle
  const drawRoundedRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.arcTo(x + width, y, x + width, y + radius, radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
    ctx.lineTo(x + radius, y + height);
    ctx.arcTo(x, y + height, x, y + height - radius, radius);
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);
    ctx.closePath();
  };

  // --- Main useEffect for animation and event listeners ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationFrameId: number;

    const render = (time: number) => {
      draw(ctx, time);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render(0);

    // --- Event Handling ---
    const getMousePosition = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const isMouseInsideButton = (pos: { x: number; y: number }) => {
      const buttonWidth =
        ctx.measureText(config.text).width + config.padding.x * 2;
      const buttonHeight = 18 + config.padding.y * 2;
      const canvasPadding = 25;
      const buttonX = canvasPadding;
      const buttonY = canvasPadding;
      return (
        pos.x > buttonX &&
        pos.x < buttonX + buttonWidth &&
        pos.y > buttonY &&
        pos.y < buttonY + buttonHeight
      );
    };

    const handleMouseMove = (e: MouseEvent) => {
      const currentHoverState = state.current.isHovering;
      state.current.isHovering = isMouseInsideButton(getMousePosition(e));
      if (currentHoverState !== state.current.isHovering) {
        canvas.style.cursor = state.current.isHovering ? "pointer" : "default";
      }
    };

    const handleMouseDown = () => {
      if (state.current.isHovering) state.current.isMouseDown = true;
    };
    const handleMouseUp = () => {
      if (state.current.isMouseDown && state.current.isHovering) {
        window.open(config.url, "_blank", "noopener,noreferrer");
      }
      state.current.isMouseDown = false;
    };
    const handleMouseOut = () => {
      state.current.isHovering = false;
      state.current.isMouseDown = false;
      canvas.style.cursor = "default";
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseout", handleMouseOut);
    };
  }, [draw, config]);

  return (
    <canvas
      ref={canvasRef}
      style={{ border: "1px solid #444", borderRadius: "8px" }}
    />
  );
};

// --- Main About Page Component ---
export default function AboutPage() {
  const features = [
    {
      icon: <ShieldCheckIcon />,
      title: "No Setup",
      description: "Just tell HeybossAI what you need — we do the rest.",
      styleProps: { base: 220, spread: 200 },
    },
    {
      icon: <FastForwardIcon />,
      title: "Instant Build",
      description: "Your database is ready in seconds, no config needed.",
      styleProps: { base: 280, spread: 300 },
    },
    {
      icon: <GlobeIcon />,
      title: "Auto-Connected",
      description: "Pages and forms connect to your data automatically.",
      styleProps: { base: 120, spread: 200 },
    },
    {
      icon: <PercentIcon />,
      title: "Scales Fast",
      description: "Grows with your business — no maintenance required.",
      styleProps: { base: 30, spread: 200 },
    },
  ];

  return (
    <>
      <style jsx global>{`
        body {
          font-family: "Inter", sans-serif;
        }

        [data-glow]::before,
        [data-glow]::after {
          pointer-events: none;
          content: "";
          position: absolute;
          inset: calc(var(--border-size) * -1);
          border: var(--border-size) solid transparent;
          border-radius: calc(var(--radius) * 1px);
          background-attachment: fixed;
          background-size: calc(100% + (2 * var(--border-size)))
            calc(100% + (2 * var(--border-size)));
          background-repeat: no-repeat;
          background-position: 50% 50%;
          mask: linear-gradient(transparent, transparent),
            linear-gradient(white, white);
          mask-clip: padding-box, border-box;
          mask-composite: intersect;
          opacity: var(--glow-opacity, 0);
          transition: opacity 500ms ease;
        }

        [data-glow]::before {
          background-image: radial-gradient(
            calc(var(--spotlight-size) * 0.75)
              calc(var(--spotlight-size) * 0.75) at calc(var(--x, 0) * 1px)
              calc(var(--y, 0) * 1px),
            hsl(
              var(--hue, 210) calc(var(--saturation, 100) * 1%)
                calc(var(--lightness, 50) * 1%) / var(--border-spot-opacity, 1)
            ),
            transparent 100%
          );
          filter: brightness(2);
        }

        [data-glow]::after {
          background-image: radial-gradient(
            calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5)
              at calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
            hsl(0 100% 100% / var(--border-light-opacity, 1)),
            transparent 100%
          );
        }

        [data-glow] [data-glow] {
          position: absolute;
          inset: 0;
          will-change: filter;
          opacity: var(--outer, 1);
          border-radius: calc(var(--radius) * 1px);
          border-width: calc(var(--border-size) * 20);
          filter: blur(calc(var(--border-size) * 10));
          background: none;
          pointer-events: none;
          border: none;
        }

        [data-glow] > [data-glow]::before {
          inset: -10px;
          border-width: 10px;
        }
      `}</style>
      <main className="bg-gray-900 text-white min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              About{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                SELVE
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We're building the future of AI-powered development. Our mission
              is to make creating applications as simple as having a
              conversation.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <SpotlightCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                styleProps={feature.styleProps}
              />
            ))}
          </div>

          {/* Call-to-Action Button */}
          <div className="flex justify-center mt-16">
            <CanvasButton />
          </div>
        </div>
      </main>
    </>
  );
}
