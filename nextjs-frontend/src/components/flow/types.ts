import { Lson } from '@liveblocks/client';
import { BuiltInEdge, BuiltInNode, Node } from '@xyflow/react';
import { PolymorphicEdgeType } from './edges/PolymorphicEdge';
import { RichTextNodeType } from './nodes/RichTextNode';
import { ShapeNodeType } from "./nodes/ShapeNode";



type ConcreteNode<NodeData extends Record<string, unknown> = Record<string, unknown>, NodeType extends string = string> = Node<NodeData, NodeType> & { type: NodeType };

type FlowNodeType = ShapeNodeType | BuiltInNode | RichTextNodeType;


type FlowEdgeType = BuiltInEdge | PolymorphicEdgeType



type FilterProps<Type, FilterType> = {
    [Property in keyof Type as Type[Property] extends FilterType ? Property : never]: Type[Property];
};

type LiveObjectCompatible<T> = FilterProps<T, Lson | undefined>

type LiveFlowNodeType = LiveObjectCompatible<FlowNodeType>
type LiveFlowEdgeType = LiveObjectCompatible<FlowEdgeType>

export type { ConcreteNode, FlowEdgeType, FlowNodeType, LiveFlowEdgeType, LiveFlowNodeType, LiveObjectCompatible };




