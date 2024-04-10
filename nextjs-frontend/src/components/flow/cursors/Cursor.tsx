import { COLORS } from "@/color";
import { Cursor } from "@/components/cursor/Cursor";
import { useMyPresence, useOthers } from "@/liveblocks.flow.config";
import { XYPosition, useReactFlow } from "@xyflow/react";
import { FC, useEffect } from "react";

//https://codesandbox.io/p/devbox/github/liveblocks/liveblocks/tree/main/examples/nextjs-live-cursors?file=%2Fpages%2Findex.tsx

interface LiveCursorsProps {
  cursorPos: XYPosition | null;
}

const LiveCursors: FC<LiveCursorsProps> = ({ cursorPos }) => {
  const reactFlowInstance = useReactFlow();
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence();

  useEffect(() => {
    if (cursorPos) {
      const position = reactFlowInstance.screenToFlowPosition({
        x: cursorPos.x,
        y: cursorPos.y,
      });
      //Liveblocks method to set the curren cursor positon

      updateMyPresence({
        cursor: { x: Math.round(position.x), y: Math.round(position.y) },
      });
    }
  }, [cursorPos]);

  return others.map(({ connectionId, presence }) => {
    if (presence.cursor == null) {
      return (
        <Cursor
          variant={"offscreen"}
          key={connectionId}
          position={{ x: 0, y: 0 }}
          user={presence.user}
          color={COLORS[connectionId % COLORS.length]}
        />
      );
    }
    // get current Reactflow screen viewPort
    const otherViewPort = reactFlowInstance.getViewport();

    //fixing the x, y position of cursor in other screen inside of react flow
    const x = presence.cursor.x * otherViewPort.zoom + otherViewPort.x;
    const y = presence.cursor.y * otherViewPort.zoom + otherViewPort.y;

    return (
      /* The cursor component takes the x and y coordinates of the cursor 
            and accurately displays it in the correct position on     other users' screens. */
      <Cursor
        key={connectionId}
        variant={"default"}
        position={{ x, y }}
        user={presence.user}
        color={COLORS[connectionId % COLORS.length]}
      />
    );
  });
};

export { LiveCursors };
