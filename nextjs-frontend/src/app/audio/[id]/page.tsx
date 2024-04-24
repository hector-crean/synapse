"use client";


import { AudioPlayer } from "@/components/audio/AudioPlayer";
import { Logo } from "@/components/audio/Logo";
import { Presence } from "@/components/audio/Presence";
import RoomErrors from "@/components/audio/RoomErrors";
import { Threads } from "@/components/audio/Threads";
import { useParams } from "next/navigation";
import { AudioRoom } from "./AudioRoom";

import * as z from "zod";

const NextAuthSchema = z.object({
    image: z.string().nullable(),
    name: z.string().nullable(),
    email: z.string(),
});


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
                    <h1>
                        <span className="sr-only">SoundBlocks</span>
                        <Logo className="h-4 sm:h-5 w-auto fill-current" />
                    </h1>
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