"use client";

import { Toaster } from "@/components/ui/toaster";
import { RoomProvider } from "@/liveblocks-configs/audio-room.config";
import * as Tooltip from "@radix-ui/react-tooltip";
import { ReactNode } from "react";

type AudioRoomProps = {
    roomId: string,
    children: ReactNode
}

export function AudioRoom({ roomId, children }: AudioRoomProps) {

    return (
        <Tooltip.Provider delayDuration={0}>
            <RoomProvider
                id={roomId}
                initialPresence={{
                    state: "paused",
                    time: 0,
                }}
            >
                {children}
                <Toaster />
            </RoomProvider>
        </Tooltip.Provider>
    );
}

