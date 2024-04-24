import {
    NodeProps,
    useViewport,
    XYPosition
} from "@xyflow/react";

import { motion } from 'framer-motion';
import { useMemo } from "react";
import { NewThreadComposer } from "../threads/Composer";
import { ConcreteNode } from "../types";


const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max));


type ThreadCreatorProps = {
    reactFlowId: string,
    size: number,
    //selected is not the same as dragging etc. 
    selected: boolean;
    flowPosition: XYPosition
}
const ThreadCreator = ({ reactFlowId, size, selected, flowPosition }: ThreadCreatorProps) => {

    return (
        <>
            <motion.div
                className={`flex flex-row justify-center items-start w-min h-min`}
            >

                <motion.div
                    style={{
                        width: `${size}px`,
                        height: `${size}px`
                    }}
                    className={`p-[1px] flex flex-col items-center justify-center w-full h-full aspect-square rounded-tl-full rounded-tr-full rounded-br-full bg-gray-500`}
                >
                    <div className={`w-full h-full rounded-full ${selected ? 'bg-red-500' : 'bg-blue-400'}`} style={{

                    }}></div>
                </motion.div>
                {selected && <NewThreadComposer reactFlowId={reactFlowId} flowPosition={flowPosition} />}
            </motion.div>
        </>
    );
}

//

type CommentNodeData = {
    color: string;
};

type CommentNodeType = ConcreteNode<CommentNodeData, "CommentNode">;


function CommentNode({
    id,
    selected,
    data,
    width,
    height,
    positionAbsoluteX,
    positionAbsoluteY,

}: NodeProps<CommentNodeType>) {
    const { color } = data;

    // Want comments to be a constant size, independent on the viewport zoom etc. 
    const viewport = useViewport()

    const SIZE = 40;

    const size = useMemo(() => clamp(Math.round(SIZE / viewport.zoom), 12, Infinity), [SIZE, viewport])

    return (
        <>
            {/* <svg width={SIZE / viewport.zoom} height={SIZE / viewport.zoom} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.41 2.89 8.18 7 9.74V22l2.08-1.11C13.17 20.95 14.53 21 16 21c5.52 0 10-4.48 10-10S21.52 2 16 2h-4z" fill="#5f6368" />
                <circle cx="8" cy="12" r="1.5" fill="#fff" />
                <circle cx="12" cy="12" r="1.5" fill="#fff" />
                <circle cx="16" cy="12" r="1.5" fill="#fff" />
            </svg> */}
            <ThreadCreator reactFlowId={id} size={size} selected={selected ?? false} flowPosition={{ x: positionAbsoluteX, y: positionAbsoluteY }} />

        </>
    );
}



export { CommentNode };
export type { CommentNodeType };

