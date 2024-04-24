import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { ThreadMetadata, useCreateThread, useSelf } from "@/liveblocks-configs/flow-room.config";
import { ThreadData } from '@liveblocks/client';
import { ComposerSubmitComment, Thread } from "@liveblocks/react-comments";
import {
    Composer,
} from "@liveblocks/react-comments/primitives";
import { XYPosition } from "@xyflow/react";
import { motion } from 'framer-motion';
import { SendIcon } from "lucide-react";
import Link from "next/link";
import { FormEvent, useCallback } from "react";
import { Mention } from "./Mention";
import { MentionSuggestions } from "./MentionSuggestions";

// Custom Formatting Toolbar Button to toggle blue text & background color.




type ThreadComposerProps = {
    thread: ThreadData<ThreadMetadata>,

}
const ThreadComposer = ({ thread }: ThreadComposerProps) => {

    return (
        <motion.div
            className="bg-white-100 rounded-md p-4 w-full flex flex-col bg-white"
        >

            <Thread<ThreadMetadata> key={thread.id} thread={thread} showActions={'hover'} />
        </motion.div>

    )
}






interface NewThreadComposerProps {
    reactFlowId: string,
    flowPosition: XYPosition
}
const NewThreadComposer = ({ reactFlowId, flowPosition }: NewThreadComposerProps) => {

    const currentUser = useSelf();
    const createThread = useCreateThread();

    const { toast } = useToast()

    // Submit thread with current time
    const handleSubmit = useCallback(
        ({ body }: ComposerSubmitComment, event: FormEvent<HTMLFormElement>) => {

            event.preventDefault();

            createThread({
                body,
                metadata: {
                    reactFlowId,
                    resolved: false,
                    x: flowPosition.x,
                    y: flowPosition.y
                },
            });

            toast({
                title: "Comment Added ",
                description: "Success",
                action: (
                    <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
                ),
            })
        },
        [createThread, toast, flowPosition]
    );


    return (
        <Composer.Form
            onComposerSubmit={handleSubmit}
            className="w-full min-w-52"
        >
            <div className="flex gap-3 items-end">
                {currentUser && (
                    <div className="shrink-0 mb-0.5">
                        <img
                            className="rounded-full size-9"
                            width={40}
                            height={40}
                            src={currentUser.info.avatar}
                            alt={currentUser.info.name}
                        />
                    </div>
                )}
                <Composer.Editor
                    className={"!min-h-10 px-3 py-2 w-full bg-white border border-neutral-200 rounded-lg shadow-sm outline-none"}
                    placeholder="Write a comment…"
                    components={{
                        Mention: (props) => (
                            <Composer.Mention asChild>
                                <Mention {...props} />
                            </Composer.Mention>
                        ),
                        MentionSuggestions: MentionSuggestions,
                        Link: (props) => (
                            <Composer.Link asChild>
                                <Link {...props}>{props.children}</Link>
                            </Composer.Link>
                        ),
                    }}

                />
                <Composer.Submit asChild>
                    <button className="bg-neutral-900 shrink-0 size-10 rounded-full flex items-center justify-center disabled:bg-neutral-200 transition-colors duration-150 ease-out hover:bg-neutral-800 focus:bg-neutral-800">
                        <SendIcon className="size-4 text-white" />
                    </button>
                </Composer.Submit>
            </div>
        </Composer.Form>
    )
}



export { NewThreadComposer, ThreadComposer };

