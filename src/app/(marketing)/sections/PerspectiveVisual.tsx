"use client";

import { useEffect, useState, memo, CSSProperties } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

const AVATAR_SIZE = 48;
const CENTRAL_SIZE = 300;
const ORBIT_DURATION = 10; // seconds
const RADIUS = 200;         // px
const NUM_AVATARS = 6;

export const PerspectiveVisual = memo(() => {
  const [rotation, setRotation] = useState(0);
  const { resolvedTheme } = useTheme();

  // Use low contrast orbiting avatar on light mode only
  const orbitingAvatarSrc =
    resolvedTheme === "light"
      ? "/images/minimalist-avatar-low-contrast.png"
      : "/images/minimalist-avatar.png";

  const centralAvatarSrc = "/images/minimalist-avatar.png";

  // Animate rotation
  useEffect(() => {
    let startTime: number;
    let frameId: number;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const degPerMs = 360 / (ORBIT_DURATION * 1000);
      setRotation((elapsed * degPerMs) % 360);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Compute avatar positions
  type AvatarData = { i: number; baseAngle: number; zDepth: number };
  const allAvatars = Array.from({ length: NUM_AVATARS }).map((_, i) => {
    const baseAngle = (360 / NUM_AVATARS) * i;
    const rad = ((baseAngle + rotation) * Math.PI) / 180;
    const zDepth = Math.sin(rad);
    return { i, baseAngle, zDepth };
  });

  const behind = allAvatars.filter(a => a.zDepth <= 0);
  const front = allAvatars.filter(a => a.zDepth > 0);

  const orbitStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    transformStyle: "preserve-3d",
    transform: `rotateY(${rotation}deg)`,
  };

  const renderAvatar = ({ i, baseAngle }: AvatarData) => {
    const style: CSSProperties = {
      position: "absolute",
      top: "50%",
      left: "50%",
      width: AVATAR_SIZE,
      height: AVATAR_SIZE,
      transform: `rotateY(${baseAngle}deg) translateZ(${RADIUS}px) translate(-50%, -50%)`,
    };
    return (
      <div key={i} style={style}>
        <Image
          src={orbitingAvatarSrc}
          alt={`Orbiting avatar ${i + 1}`}
          width={AVATAR_SIZE}
          height={AVATAR_SIZE}
          className="rounded-full object-cover shadow-md"
        />
      </div>
    );
  };

  return (
    <div className="relative w-full h-full max-w-[600px] aspect-square mx-auto">
      <div className="relative w-full h-full" style={{ perspective: 1000 }}>
        <div style={orbitStyle}>
          {behind.map(renderAvatar)}

          {/* Central avatar remains the same */}
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
            />
          </div>

          {front.map(renderAvatar)}
        </div>
      </div>
    </div>
  );
});

PerspectiveVisual.displayName = "PerspectiveVisual";
