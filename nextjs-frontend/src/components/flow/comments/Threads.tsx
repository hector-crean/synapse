import { useThreads } from "@/liveblocks-configs/flow-room.config";
import { Thread } from "@liveblocks/react-comments";

const Threads = () => {
    const { threads } = useThreads();

    return (
        <>
            {threads.map((thread) => (
                <Thread key={thread.id} thread={thread} />
            ))}
        </>
    );
}


export { Threads };
