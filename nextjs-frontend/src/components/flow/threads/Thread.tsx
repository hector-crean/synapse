"use client";


import { ThreadMetadata, useThreads } from "@/liveblocks-configs/flow-room.config";
import { ThreadData } from "@liveblocks/core";
import { ClientSideSuspense } from "@liveblocks/react";
import { Thread } from "@liveblocks/react-comments";
import { useCallback, useRef, useState } from "react";
import {
    MessageSquare as MessageSquareIcon
} from "react-feather";

export function Threads() {
    return (
        <ClientSideSuspense fallback={null}>
            {() => <ThreadList />}
        </ClientSideSuspense>
    );
}

function ThreadList() {
    const { threads } = useThreads();

    if (threads.length === 0) {
        return null;
    }

    return (
        <div className="border border-neutral-200 rounded-lg overflow-hidden shadow-sm bg-white flex flex-col divide-y divide-neutral-200 max-w-screen-sm mx-auto" >
            <div className="p-4 font-medium flex gap-2 items-center">
                <MessageSquareIcon className="size-4 text-neutral-600" />
                {threads.length} comment{threads.length > 1 ? "s" : ""}
            </div>
            {threads.map((thread) => (
                <CustomThread key={thread.id} thread={thread} />
            ))}
        </div>
    );
}

function CustomThread({ thread }: { thread: ThreadData<ThreadMetadata> }) {
    const ref = useRef<HTMLDivElement>(null);


    const [highlightedThread, setHighlightedThread] = useState(false);

    // Skip to metadata time
    const handleButtonClick = useCallback(() => {



    }, []);

    return (
        <div
            ref={ref}
            className="relative"
            data-highlight={highlightedThread || undefined}
        >

            <Thread thread={thread} indentCommentContent={true} />
        </div>
    );
}

