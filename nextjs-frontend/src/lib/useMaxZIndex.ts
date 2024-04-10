import { useThreads } from "@/liveblocks.flow.config";
import { useMemo } from "react";

export function useMaxZIndex() {
  const { threads } = useThreads();

  return useMemo(() => {
    let max = 0;
    for (const thread of threads) {
      if (thread.metadata.zIndex > max) {
        max = thread.metadata.zIndex;
      }
    }
    return max;
  }, [threads]);
}
