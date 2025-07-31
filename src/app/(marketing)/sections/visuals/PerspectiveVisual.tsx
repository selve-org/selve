// src/app/(marketing)/sections/visuals/PerspectiveVisual.tsx
"use client";

import { useEffect, useState, memo, CSSProperties, useRef } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

const CENTRAL_SIZE = 700;
const ORBIT_DURATION = 10; // seconds per full orbit
const PAUSE_DURATION = 4000; // ms to pause after full orbit
const RADIUS = 200; // px
const NUM_AVATARS = 6;

export const PerspectiveVisual = memo(() => {
  const [rotation, setRotation] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showAvatars, setShowAvatars] = useState(true);
  const startTimeRef = useRef<number | null>(null);
  const frameIdRef = useRef<number | null>(null);
  const { resolvedTheme } = useTheme();

  const orbitingAvatarSrc =
    resolvedTheme === "light"
      ? "/images/minimalist-avatar-low-contrast.png"
      : "/images/minimalist-avatar.png";

  const centralAvatarSrc = "/images/minimalist-avatar.png";

  useEffect(() => {
    const degPerMs = 360 / (ORBIT_DURATION * 1000);

    const animate = (time: number) => {
      if (startTimeRef.current === null) startTimeRef.current = time;
      const elapsed = time - startTimeRef.current;
      const currentRotation = (elapsed * degPerMs) % 360;

      setRotation(currentRotation);

      if (Math.floor(currentRotation) === 0 && elapsed > 100) {
        setIsPaused(true);
        setShowAvatars(false); // start transition
        cancelAnimationFrame(frameIdRef.current!);

        setTimeout(() => {
          setIsPaused(false);
          setShowAvatars(true); // reveal again with animation
          startTimeRef.current = null;
          frameIdRef.current = requestAnimationFrame(animate);
        }, PAUSE_DURATION);
      } else {
        frameIdRef.current = requestAnimationFrame(animate);
      }
    };

    frameIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
    };
  }, []);

  type AvatarData = { i: number; baseAngle: number; zDepth: number };
  const allAvatars: AvatarData[] = Array.from({ length: NUM_AVATARS }).map(
    (_, i) => {
      const baseAngle = (360 / NUM_AVATARS) * i;
      const rad = ((baseAngle + rotation) * Math.PI) / 180;
      const zDepth = Math.sin(rad);
      return { i, baseAngle, zDepth };
    }
  );

  const behind = allAvatars.filter((a) => a.zDepth <= 0);
  const front = allAvatars.filter((a) => a.zDepth > 0);

  const orbitStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    transformStyle: "preserve-3d",
    transform: `rotateY(${rotation}deg)`,
  };

  const renderAvatar = ({ i, baseAngle }: AvatarData) => {
    const transform = `rotateY(${baseAngle}deg) translateZ(${RADIUS}px) translate(-50%, -50%)`;
    const transitionClass = showAvatars
      ? "opacity-100 scale-100 translate-y-0"
      : "opacity-0 scale-75 translate-y-4";

    const style: CSSProperties = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform,
      width: "clamp(28px, 4vw, 48px)",
      height: "clamp(28px, 4vw, 48px)",
    };

    return (
      <div
        key={i}
        style={style}
        className={`transition-all duration-700 ease-out ${transitionClass}`}
      >
        <Image
          src={orbitingAvatarSrc}
          alt={`Orbiting avatar ${i + 1}`}
          fill
          sizes="(max-width: 640px) 28px, (max-width: 1024px) 36px, 48px"
          className="rounded-full object-cover shadow-md"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
    );
  };

  return (
    <div className="relative w-full h-full max-w-[600px] aspect-square mx-auto overflow-hidden">
      <div className="relative w-full h-full" style={{ perspective: 1000 }}>
        <div style={orbitStyle}>
          {behind.map(renderAvatar)}

          {/* Central avatar remains visible and static */}
          <div
            className="absolute top-1/2 left-1/2"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <Image
              src={centralAvatarSrc}
              alt="Central avatar"
              width={CENTRAL_SIZE}
              height={CENTRAL_SIZE}
              priority
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>

          {front.map(renderAvatar)}
        </div>
      </div>
    </div>
  );
});

PerspectiveVisual.displayName = "PerspectiveVisual";
