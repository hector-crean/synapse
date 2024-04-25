import {
    NodeProps,
    useReactFlow,
    useViewport
} from "@xyflow/react";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { motion } from 'framer-motion';
import { useCallback, useMemo, useState } from "react";
import { NewThreadComposer } from "../threads/Composer";
import { ConcreteNode } from "../types";



const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max));


type ThreadCreatorProps = {
    reactFlowId: string,
    size: number,
    selected: boolean;
}
const ThreadCreator = ({ reactFlowId, size, selected, }: ThreadCreatorProps) => {

    const [commentCreated, setCommentCreated] = useState(false)
    const showComposer = useMemo(() => selected && !commentCreated, [selected, commentCreated])

    return (
        <>
            <motion.div
                className={`flex flex-row justify-start items-start w-min h-min gap-4`}
            >
                <Popover>
                    <PopoverTrigger asChild>
                        <motion.div
                            style={{
                                transform: `scale(${size}, ${size})`
                            }}
                            className={`p-[1px] flex flex-col items-center justify-center w-full h-full aspect-square rounded-tl-full rounded-tr-full rounded-br-full bg-gray-500`}
                        >
                            <div className={`w-full h-full rounded-full ${selected ? 'bg-grey-800' : 'bg-blue-200'}`} />
                        </motion.div>
                    </PopoverTrigger>
                    {showComposer && <PopoverContent className="w-80">
                        <NewThreadComposer
                            reactFlowId={reactFlowId}
                            setCommentCreated={setCommentCreated}
                        />
                    </PopoverContent>}
                </Popover>


            </motion.div>
        </>
    );
}

//

type CommentNodeData = {
    color: string;
    commentCreated: boolean
};

type CommentNodeType = ConcreteNode<CommentNodeData, "CommentNode">;


function CommentNode({
    id,
    selected,
    data,
    width,
    height,
}: NodeProps<CommentNodeType>) {

    const { setNodes } = useReactFlow()
    const { color, commentCreated } = data;
    const viewport = useViewport()
    const SIZE = 40;
    const size = useMemo(() => clamp(Math.round(SIZE / viewport.zoom), 1, Infinity), [SIZE, viewport])


    const [open, setOpen] = useState(!commentCreated || selected);

    const onOpenChange = (open: boolean) => {
        if (commentCreated) {
            setOpen(false)
        } else {
            setOpen(open)
        }
    }


    const updateCommentCreated = useCallback((created: boolean) => {
        setNodes(nodes => nodes.map(node => {
            if (node.id === id) {
                return ({ ...node, data: { ...node.data, commentCreated: created } })
            } else {
                return node
            }
        }))
        setOpen(false)
    }, [id, setNodes])




    return (
        <motion.div
            className={`flex flex-row justify-start items-start w-min h-min gap-4`}
        >
            <Popover open={open} onOpenChange={onOpenChange}>
                <PopoverTrigger asChild >
                    <motion.div
                        style={{
                            transform: `scale(${size}, ${size})`
                        }}
                        className={`p-[1px] flex flex-col items-center justify-center w-full h-full aspect-square rounded-tl-full rounded-tr-full rounded-br-full ${commentCreated ? 'bg-gray-950' : 'bg-gray-500'}`}
                    >
                        <div className={`w-full h-full rounded-full ${selected ? 'bg-grey-800' : 'bg-blue-200'}`} />
                    </motion.div>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <NewThreadComposer
                        reactFlowId={id}
                        setCommentCreated={updateCommentCreated}
                    />
                </PopoverContent>
            </Popover>


        </motion.div>
    );
}



export { CommentNode };
export type { CommentNodeType };

