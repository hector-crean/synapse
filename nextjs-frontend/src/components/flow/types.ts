import { Lson } from '@liveblocks/client';
import { BuiltInEdge, BuiltInNode } from '@xyflow/react';
import { PolymorphicEdgeType } from './edges/PolymorphicEdge';
import { RichTextNodeType } from './nodes/RichTextNode';
import { ShapeNodeType } from "./nodes/ShapeNode";




type FlowNodeType = ShapeNodeType | BuiltInNode | RichTextNodeType


type FlowEdgeType = BuiltInEdge | PolymorphicEdgeType



type FilterProps<Type, FilterType> = {
    [Property in keyof Type as Type[Property] extends FilterType ? Property : never]: Type[Property];
};

type LiveObjectCompatible<T> = FilterProps<T, Lson | undefined>

type LiveFlowNodeType = LiveObjectCompatible<FlowNodeType>
type LiveFlowEdgeType = LiveObjectCompatible<FlowEdgeType>

export type { FlowEdgeType, FlowNodeType, LiveFlowEdgeType, LiveFlowNodeType, LiveObjectCompatible };




// const defaultFlowNode = (type: FlowNodeType['type'], props: Partial<FlowNodeType>): FlowNodeType => {
//     switch(type){
//         case 'PolymorphicNode':
//             return {
//                 id: uuidv4(),
//                 type,
//                 position: { x: 0, y: 0},
//                 style: { width: 100, height: 100 },
//                 data: {
//                   blocks: [renderable],
//                   accentColor: "red",
//                 },
//                 selected: true,
//                 ...props
//             }
//     }
// }