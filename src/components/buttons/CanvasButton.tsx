"use client";

import React, { useRef, useEffect, useCallback } from "react";

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

  return <canvas ref={canvasRef} style={{ borderRadius: "8px" }} />;
};

export default CanvasButton;
