"use client";
import { useOther } from "@/liveblocks-configs/flow-room.config";
import { Viewport, XYPosition } from "@xyflow/react";
import { motion } from "framer-motion";
import { memo, useMemo } from "react";
import styles from './Cursor.module.css';
enum CursorMode {
  Hidden,
  Chat,
  ReactionSelector,
  Reaction,
}

type CursorState =
  | {
    mode: CursorMode.Hidden;
  }
  | {
    mode: CursorMode.Chat;
    message: string;
    previousMessage: string | null;
  }
  | {
    mode: CursorMode.ReactionSelector;
  }
  | {
    mode: CursorMode.Reaction;
    reaction: string;
    isPressed: boolean;
  };

type Props = {
  color: string;
  viewport: Viewport
  connectionId: number;
  flowToScreenPosition: (flowPosition: XYPosition) => XYPosition
};

export function CursorComponent({ color, viewport, connectionId, flowToScreenPosition }: Props) {

  const info = useOther(connectionId, (other) => other.info);
  const cursorFlowPosition = useOther(connectionId, (other) => other.presence.cursor);

  const coords = useMemo(() => {

    if (!cursorFlowPosition) {
      return {
        x: 0,
        y: 0
      }
    } else {

      // const coords = flowToScreenPosition({ x: cursorFlowPosition.x, y: cursorFlowPosition.y })
      const coords = {
        x: cursorFlowPosition.x * viewport.zoom + viewport.x,
        y: cursorFlowPosition.y * viewport.zoom + viewport.y
      };

      return coords
    }
  }, [cursorFlowPosition, viewport, flowToScreenPosition])

  if (!cursorFlowPosition) return null;


  // const coords = {
  //   x: cursorFlowPosition.x ,
  //   y: cursorFlowPosition.y 
  // }




  // const cursorClientPosition = flowToScreenPosition({x: cursorFlowPosition.x, y: cursorFlowPosition.y})

  return (

    <motion.div
      aria-hidden="true"
      className={styles.cursor}
      initial={coords}
      animate={coords}
      transition={{
        type: "spring",
        damping: 20,
        mass: 0.4,
        stiffness: 400,
      }}
    >
      <svg viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1.24177 0.0522243L21.6392 7.0936H21.667C21.8429 7.15694 21.9944 7.26959 22.1012 7.41658C22.2081 7.56357 22.2653 7.73795 22.2653 7.91656C22.2653 8.09516 22.2081 8.26954 22.1012 8.41653C21.9944 8.56353 21.8429 8.67618 21.667 8.73952L12.7663 12.1194L9.20604 20.569C9.13733 20.7328 9.01841 20.8732 8.86467 20.9721C8.71094 21.0709 8.52947 21.1237 8.34378 21.1235C8.15324 21.1235 7.96735 21.0676 7.8114 20.9637C7.65546 20.8598 7.53704 20.7127 7.47225 20.5426L0.055012 1.17884C-0.00472376 1.02164 -0.016082 0.851545 0.0222651 0.688441C0.0606122 0.525336 0.14708 0.375966 0.271558 0.257796C0.396035 0.139626 0.553379 0.0575406 0.72519 0.0211368C0.897001 -0.0152671 1.07618 -0.00448438 1.24177 0.0522243Z"
          style={{
            fill: color,
          }}
          fill="currentFill"
        />
      </svg>
      <span
        style={{
          backgroundColor: color,
        }}
      >
        {info?.name}
      </span>
    </motion.div>
  );
}


export const Cursor = memo(CursorComponent);
