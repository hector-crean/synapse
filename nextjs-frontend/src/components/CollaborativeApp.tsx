"use client";

import { useOthers } from "@/liveblocks-configs/flow-room.config";

export function CollaborativeApp() {
  const others = useOthers();

  return <div>There are {others.length} other people online.</div>;
}
