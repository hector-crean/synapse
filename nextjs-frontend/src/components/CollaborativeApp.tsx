"use client";

import { useOthers } from "@/liveblocks.flow.config";

export function CollaborativeApp() {
  const others = useOthers();

  return <div>There are {others.length} other people online.</div>;
}
