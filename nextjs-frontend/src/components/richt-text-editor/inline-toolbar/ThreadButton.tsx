import { ThreadMetadata } from "@/liveblocks-configs/text-room.config";
import {
    ToolbarButton,
    useBlockNoteEditor
} from "@blocknote/react";
import { ThreadData } from '@liveblocks/client';
import { Thread } from "@liveblocks/react-comments";
import { ChatBubbleIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import { Dispatch, SetStateAction, useState } from "react";

// Custom Formatting Toolbar Button to toggle blue text & background color.

interface ThreadButton {
    threadComposerState: ThreadComposerState
    setThreadComposerState: Dispatch<SetStateAction<ThreadComposerState>>
}
const ThreadButton = ({ threadComposerState, setThreadComposerState }: ThreadButton) => {
    const editor = useBlockNoteEditor();

    return (
        <ToolbarButton
            mainTooltip={"Add comment"}
            onClick={(e) => {
                const cursor = editor.getTextCursorPosition()

                setThreadComposerState({ type: 'composing' })
            }}>
            <ChatBubbleIcon />
        </ToolbarButton>
    );
}






type Composing = { type: 'composing', }
type Hidden = { type: 'hidden' }

export type ThreadComposerState = Composing | Hidden


type ThreadComposerProps = {
    thread: ThreadData<ThreadMetadata>,
    state: ThreadComposerState
    setState: Dispatch<SetStateAction<ThreadComposerState>>
}
const ThreadComposer = ({ thread, state, setState }: ThreadComposerProps) => {

    const [hovered, setHovered] = useState(false)
    const [selected, setSelected] = useState(false)

    return (
        <motion.div onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)} onTap={() => setSelected(s => !s)}>
            <Thread<ThreadMetadata> key={thread.id} thread={thread} showActions={'hover'} />
        </motion.div>

    )



}











export { ThreadButton, ThreadComposer };
