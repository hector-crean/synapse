import {
  Handle,
  NodeProps,
  NodeResizer,
  Position,
  useReactFlow,
} from "@xyflow/react";
import styles from "./RichTextNode.module.css";

import { RichText } from "@/components/rich-text/RichText";
import { Content } from "@tiptap/react";
import { ConcreteNode } from "../types";

type RichTextNodeData = {
  text: Content;
};

type RichTextNodeType = ConcreteNode<RichTextNodeData, "RichTextNode">;

const RichTextNode = (props: NodeProps<RichTextNodeType>) => {
  const instance = useReactFlow();

  const setContentHandler = (draft: Content) => {
    const data: RichTextNodeData = {
      text: draft,
    };
    instance.updateNodeData(props.id, data);
  };

  return (
    <>
      <NodeResizer minWidth={200} minHeight={200} isVisible={props.selected} />
      <div className={styles.rich_text_node}>
        <RichText
          id={props.id}
          text={props.data.text}
          setContent={setContentHandler}
        />
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="a"
        isConnectable={true}
      />
      <Handle
        type="target"
        id="b"
        position={Position.Left}
        isConnectable={true}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="c"
        isConnectable={true}
      />
      <Handle
        type="source"
        id="d"
        position={Position.Bottom}
        isConnectable={true}
      />
    </>
  );
};

export { RichTextNode, type RichTextNodeType };
