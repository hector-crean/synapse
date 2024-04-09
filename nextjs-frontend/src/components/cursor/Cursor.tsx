import { BaseUserMeta } from "@liveblocks/client";
import { XYPosition } from "@xyflow/react";
import { motion } from "framer-motion";

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
  variant: "default" | "offscreen";
  color: string;
  position: XYPosition;
  user: BaseUserMeta;
};

export function Cursor({ color, position, user, variant }: Props) {
  const cursorVariants = {
    default: {
      x: position.x,
      y: position.y,
      opacity: 1,
      // transition: {
      //   type: "spring",
      //   mass: 0.6,
      // },
    },
    offscreen: {
      x: position.x,
      y: position.y,
      opacity: 0,
    },
  };

  return (
    <motion.svg
      style={{
        position: "absolute",
        left: 0,
        top: 0,
      }}
      animate={variant}
      variants={cursorVariants}
      // transition={{
      //   type: "spring",
      //   stiffness: 500,
      //   damping: 28,
      // }}
      // transformTemplate={template}
      // transform={t}
      width="24"
      height="36"
      viewBox="0 0 24 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
          fill={color}
        />
        <text
          x="12"
          y="25"
          fontFamily="Arial"
          fontSize="10"
          fill="black"
          textAnchor="middle"
        >
          {user.id}
        </text>
      </g>
    </motion.svg>
  );
}
