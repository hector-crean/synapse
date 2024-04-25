"use client";

import { Loading } from "@/components/loading/Loading";
import { Toaster } from "@/components/ui/toaster";
import { RoomProvider } from "@/liveblocks-configs/flow-room.config";
import { ClientSideSuspense } from "@liveblocks/react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";


import * as z from "zod";
import { FlowRoom } from "./FlowRoom";

const NextAuthSchema = z.object({
  image: z.string().nullable(),
  name: z.string().nullable(),
  email: z.string(),
});

type NextAuthType = z.infer<typeof NextAuthSchema>;

const RoomQuerySchema = z.object({
  id: z.string(),
});

type RoomQuery = z.infer<typeof RoomQuerySchema>;

const Page = () => {
  const { id } = useParams<RoomQuery>();

  const { data } = useSession();

  const user = NextAuthSchema.parse(data?.user);

  return (
    <RoomProvider
      id={id}
      initialPresence={{
        cursor: null,
        user: {
          name: user.name ?? "Placeholder",
          avatar: user.image ?? "",
        },
      }}
      initialStorage={{ nodes: [], edges: [] }}
    >
      <ClientSideSuspense fallback={<Loading />}>
        {() => <FlowRoom id={id} />}
      </ClientSideSuspense>
      <Toaster />

    </RoomProvider>
  );
};

export default Page;
