"use client";
import { LiveFlowEdgeType, LiveFlowNodeType } from "@/components/flow/types";
import { BaseUserMeta, EnsureJson } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";
import { WithLiveblocks, liveblocks } from '@liveblocks/zustand';
import { EdgeChange, NodeChange, applyEdgeChanges, applyNodeChanges } from "@xyflow/react";
import { create } from "zustand";
import { FlowState } from "../components/flow/Flow";
import { client } from './client';


// Optionally, UserMeta represents static/readonly metadata on each user, as
// provided by your own custom auth back end (if used). Useful for data that
// will not change during a session, like a user's name or avatar.
type UserMeta = BaseUserMeta


// Presence represents the properties that exist on every user in the Room
// and that will automatically be kept in sync. Accessible through the
// `user.presence` property. Must be JSON-serializable.
type Presence = {
  cursor: { x: number, y: number } | null,
  user: UserMeta
  // ...
};

// Optionally, Storage represents the shared document that persists in the
// Room, even after all users leave. Fields under Storage typically are
// LiveList, LiveMap, LiveObject instances, for which updates are
// automatically persisted and synced to all connected clients.
type Storage = {
  nodes: FlowState['nodes']
  edges: FlowState['edges']
};



// Optionally, the type of custom events broadcast and listened to in this
// room. Use a union for multiple events. Must be JSON-serializable.
type RoomEvent = {
  // type: "NOTIFICATION",
  // ...
};

export const {
  suspense: {
    RoomProvider,
    useRoom,
    useMyPresence,
    useUpdateMyPresence,
    useSelf,
    useOthers,
    useOthersMapped,
    useOthersConnectionIds,
    useOther,
    useBroadcastEvent,
    useEventListener,
    useErrorListener,
    useStorage,
    useObject,
    useMap,
    useList,
    useBatch,
    useHistory,
    useUndo,
    useRedo,
    useCanUndo,
    useCanRedo,
    useMutation,
    useStatus,
    useLostConnectionListener,
  },
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent>(client);



const useLiveblocksFlowStore = create<WithLiveblocks<FlowState, {}, EnsureJson<Storage>>>()(
  liveblocks(
    (set, get) => ({
      // Initial values for nodes and edges
      nodes: [],
      edges: [],
      setNodes: (nodes) => set({ nodes: [...nodes] }),
      setEdges: (edges) => set({ edges: [...edges] }),
      // Apply changes to React Flow when the flowchart is interacted with
      onNodesChange: (changes: NodeChange<LiveFlowNodeType>[]) => {
        set({
          nodes: applyNodeChanges<LiveFlowNodeType>(changes, get().nodes),
        });
      },
      onEdgesChange: (changes: EdgeChange<LiveFlowEdgeType>[]) => {
        set({
          edges: applyEdgeChanges(changes, get().edges),
        });
      },

    }),
    {
      // Add Liveblocks client
      client,

      // Define the store properties that should be shared in real-time
      storageMapping: {
        nodes: true,
        edges: true,
      },
    }
  )
)

export { useLiveblocksFlowStore };
export type { Presence, UserMeta };

