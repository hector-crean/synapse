"use client";
import { COLORS } from "@/color";
import { Cursor } from "@/components/flow/cursor/Cursor";
import {
  useOthers
} from "@/liveblocks-configs/flow-room.config";
import { useReactFlow } from "@xyflow/react";
import { FC } from "react";

//https://codesandbox.io/p/devbox/github/liveblocks/liveblocks/tree/main/examples/nextjs-live-cursors?file=%2Fpages%2Findex.tsx

interface LiveCursorsProps {
}

const LiveCursors: FC<LiveCursorsProps> = ({  }) => {


  const reactFlowInstance = useReactFlow();
  const viewport = reactFlowInstance.getViewport();

  const others = useOthers();

  return others.map(other => <Cursor
    key={other.connectionId}
    connectionId={other.connectionId}
    viewport={viewport}
    flowToScreenPosition={reactFlowInstance.flowToScreenPosition}
    color={COLORS[other.connectionId % COLORS.length]}
  />);
};

export { LiveCursors };

