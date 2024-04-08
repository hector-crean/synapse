"use client";

import { Loading } from "@/components/Loading";
import { RoomProvider } from "@/liveblocks.config";
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

  const result = NextAuthSchema.safeParse(data?.user);

  if (result.success) {
    return (
      <RoomProvider
        id={id}
        initialPresence={{
          cursor: null,
          user: {
            name: result.data.name ?? "Placeholder",
            avatar: result.data.image ?? "",
          },
        }}
        initialStorage={{ nodes: [], edges: [] }}
      >
        <ClientSideSuspense fallback={<Loading />}>
          {() => <FlowRoom id={id} />}
        </ClientSideSuspense>
      </RoomProvider>
    );
  } else {
    return null;
  }
};

export default Page;
