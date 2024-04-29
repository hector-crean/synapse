import {
  Handle,
  NodeProps,
  NodeResizer,
  Position,
  useReactFlow,
} from "@xyflow/react";

import { RichTextEditor } from "@/components/blocknote/Blocknote";
import { Block } from "@blocknote/core";
import { ConcreteNode } from "../types";


type RichTextNodeData = {
  blocks: Array<Block>;
};

type RichTextNodeType = ConcreteNode<RichTextNodeData, "RichTextNode">;

const RichTextNode = (props: NodeProps<RichTextNodeType>) => {

  const { setNodes, updateNodeData } = useReactFlow();

  const setBlocks = (draft: Array<Block>) => {
    const data: RichTextNodeData = {
      blocks: draft,
    };
    updateNodeData(props.id, data);


  };





  return (
    <>
      <NodeResizer minWidth={200} isVisible={props.selected} />
      <div className="w-full h-full flex-1 flex flex-col">
        <RichTextEditor
          blocks={props.data.blocks}
          setBlocks={setBlocks}
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

