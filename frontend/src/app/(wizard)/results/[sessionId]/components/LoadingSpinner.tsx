"use client";

import { SoundWaveLoader } from "@/components/shared/SoundWaveLoader";

export function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2B1B4D] via-[#1a0f30] to-[#2B1B4D] flex items-center justify-center">
      <SoundWaveLoader size="lg" color="pink" text="Loading" />
    </div>
  );
}
