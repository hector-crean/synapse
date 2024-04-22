import { useThreads } from "@/liveblocks-configs/text-room.config";
import { Composer, Thread } from "@liveblocks/react-comments";

const Threads = () => {
    const { threads } = useThreads();

    return (
        <>
            {threads.map((thread) => (
                <Thread key={thread.id} thread={thread} />
            ))}
            <Composer />
        </>
    );
}


export { Threads };
