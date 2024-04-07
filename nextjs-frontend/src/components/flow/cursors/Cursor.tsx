import { Cursor } from "@/components/cursor/Cursor";
import { useMyPresence, useOthers } from "@/liveblocks.config";
import { useReactFlow } from "@xyflow/react";
import { FC, useEffect } from "react";

//https://codesandbox.io/p/devbox/github/liveblocks/liveblocks/tree/main/examples/nextjs-live-cursors?file=%2Fpages%2Findex.tsx

interface LiveCursorsProps {
  cursorPos: { x: number; y: number };
}

const LiveCursors: FC<LiveCursorsProps> = ({ cursorPos }) => {
  const reactFlowInstance = useReactFlow();
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence();

  useEffect(() => {
    const position = reactFlowInstance.screenToFlowPosition({
      x: cursorPos.x,
      y: cursorPos.y,
    });
    //Liveblocks method to set the curren cursor positon

    updateMyPresence({
      cursor: { x: Math.round(position.x), y: Math.round(position.y) },
    });
  }, [cursorPos]);

  return others.map((other) => {
    if (other.presence.cursor == null) {
      return null;
    }
    // get current Reactflow screen viewPort
    const otherViewPort = reactFlowInstance.getViewport();

    //fixing the x, y position of cursor in other screen inside of react flow
    let xPos = other.presence.cursor.x * otherViewPort.zoom + otherViewPort.x;
    let yPos = other.presence.cursor.y * otherViewPort.zoom + otherViewPort.y;

    return (
      /* The cursor component takes the x and y coordinates of the cursor 
            and accurately displays it in the correct position on     other users' screens. */
      <Cursor key={other.id} x={xPos} y={yPos} />
    );
  });
};

export { LiveCursors };
