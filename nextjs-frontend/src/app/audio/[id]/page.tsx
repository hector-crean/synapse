"use client";


import { AudioPlayer } from "@/components/audio/AudioPlayer";
import { Presence } from "@/components/audio/Presence";
import RoomErrors from "@/components/audio/RoomErrors";
import { Threads } from "@/components/audio/Threads";
import { useParams } from "next/navigation";
import { AudioRoom } from "./AudioRoom";

import * as z from "zod";

const RoomQuerySchema = z.object({
    id: z.string(),
});

type RoomQuery = z.infer<typeof RoomQuerySchema>;


const Page = () => {

    const { id } = useParams<RoomQuery>();

    return (
        <AudioRoom roomId={id}>
            <div className="relative py-4 px-5 sm:p-6 mx-auto max-w-screen-lg flex flex-col">
                <header className="flex justify-between items-center">
                    <Presence />
                </header>
                <main className="pt-20 pb-16">
                    <AudioPlayer />
                    <Threads />
                </main>
            </div>
            <RoomErrors />
        </AudioRoom>
    );
}


export default Page;