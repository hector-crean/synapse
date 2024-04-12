import * as ContextMenu from "@radix-ui/react-context-menu";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { Node, XYPosition } from "@xyflow/react";
import { ReactNode, useState } from "react";
import { nodeTypes } from "../Flow";
import { defaultNode } from "../default-nodes";
import { FlowNodeType } from "../types";
import styles from "./ContextMenu.module.css";

interface NodeContextMenuProps {
  onCut: VoidFunction;
  onCopy: VoidFunction;
  onPaste: (clipboard?: XYPosition) => void;
  onAddNodes: (nodes: Array<Node>) => void;
  screenToFlowPosition: (
    clientPosition: XYPosition,
    options?:
      | {
          snapToGrid: boolean;
        }
      | undefined
  ) => XYPosition;
  children: ReactNode;
  lastClickPosition: XYPosition;
}
const NodeContextMenu = ({
  children,
  onCopy,
  onCut,
  onPaste,
  onAddNodes,
  screenToFlowPosition,
}: NodeContextMenuProps) => {
  const [pos, setPos] = useState<XYPosition>({ x: 0, y: 0 });

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger
        className={styles.ContextMenuTrigger}
        onPointerDown={(e) =>
          setPos(screenToFlowPosition({ x: e.clientX, y: e.clientY }))
        }
      >
        {children}
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content className={styles.ContextMenuContent}>
          <ContextMenu.Item
            className={styles.ContextMenuItem}
            onClick={() => onCut()}
          >
            Delete <div className={styles.RightSlot}>⌘+[</div>
          </ContextMenu.Item>
          <ContextMenu.Item
            className={styles.ContextMenuItem}
            onClick={() => onPaste({ x: 0, y: 0 })}
          >
            Duplicate <div className={styles.RightSlot}>⌘+]</div>
          </ContextMenu.Item>
          <ContextMenu.Item
            className={styles.ContextMenuItem}
            onClick={() => onCopy()}
          >
            Copy <div className={styles.RightSlot}>⌘+R</div>
          </ContextMenu.Item>
          <ContextMenu.Sub>
            <ContextMenu.SubTrigger className={styles.ContextMenuSubTrigger}>
              Add Node
              <div className={styles.RightSlot}>
                <ChevronRightIcon />
              </div>
            </ContextMenu.SubTrigger>
            <ContextMenu.Portal>
              <ContextMenu.SubContent
                className={styles.ContextMenuSubContent}
                sideOffset={2}
                alignOffset={-5}
              >
                {Object.keys(nodeTypes).map((node) => (
                  <ContextMenu.Item
                    key={node}
                    className={styles.ContextMenuItem}
                    onClick={(e) => {
                      onAddNodes([
                        defaultNode(node as FlowNodeType["type"], pos),
                      ]);
                    }}
                  >
                    {node}
                    <div className={styles.RightSlot}>⌘+{node.charAt(0)}</div>
                  </ContextMenu.Item>
                ))}

                <ContextMenu.Separator
                  className={styles.ContextMenuSeparator}
                />
                <ContextMenu.Item className={styles.ContextMenuItem}>
                  Developer Tools
                </ContextMenu.Item>
              </ContextMenu.SubContent>
            </ContextMenu.Portal>
          </ContextMenu.Sub>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
};

export { NodeContextMenu };
export type { NodeContextMenuProps };

