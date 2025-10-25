// src/components/SyncClerkToDB.tsx
"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

export function SyncClerkToDB() {
  const { isSignedIn } = useUser();
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    if (isSignedIn && !synced) {
      fetch("/api/sync-user", { method: "POST" })
        .then((res) => res.json())
        .then(() => setSynced(true))
        .catch((err) => {
          console.error("User sync failed:", err);
        });
    }
  }, [isSignedIn, synced]);

  return null;
}
