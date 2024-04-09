import { COLORS } from "@/color";
import { Avatar } from "@/components/avatar/Avatar";
import { Cursor } from "@/components/cursor/Cursor";
import { Flow } from "@/components/flow/Flow";
import { RichTextModal } from "@/components/rich-text/Modal";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { MainLayout } from "@/layouts/MainLayout";
import {
  Presence,
  UserMeta,
  useLiveblocksStore,
  useMyPresence,
  useOthers,
} from "@/liveblocks.config";
import { User } from "@liveblocks/client";
import { ReactFlowProvider } from "@xyflow/react";
import { PointerEventHandler, useEffect } from "react";
import styles from "./Room.module.css";

type CursorsProps = {
  //   presence: Presence;
  others: readonly User<Presence, UserMeta>[];
};
const Cursors = ({ others }: CursorsProps) => {
  return others
    .filter((other) => other.presence.cursor !== null)
    .map(({ connectionId, presence }) => (
      <Cursor
        key={connectionId}
        user={presence.user}
        position={presence.cursor ?? { x: 0, y: 0 }}
        color="red"
      />
    ));
};

type AvatarsProps = {
  presence: Presence;
  others: readonly User<Presence, UserMeta>[];
};
const Avatars = ({ presence, others }: AvatarsProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Avatar
        key={"me"}
        src={presence.user.avatar ?? ""}
        alt={presence.user.name ?? ""}
        color={"red"}
      />
      {others.slice(0, 3).map((user) => (
        <Avatar
          key={user.connectionId}
          src={user.presence.user.avatar ?? ""}
          alt={user.presence.user.name ?? ""}
          color={COLORS[user.connectionId % COLORS.length]}
        />
      ))}
    </div>
  );
};

interface FlowRoomProps {
  id: string;
}
const FlowRoom = ({ id }: FlowRoomProps) => {
  const {
    liveblocks: { enterRoom, leaveRoom, isStorageLoading },
    nodes,
    edges,
    setNodes,
    setEdges,
    onEdgesChange,
    onNodesChange,
  } = useLiveblocksStore();

  // Enter the Liveblocks room on load
  useEffect(() => {
    enterRoom(id);
    return () => leaveRoom();
  }, [enterRoom, leaveRoom, id]);

  const others = useOthers();
  const userCount = others.length;

  const [presence, updatePresence] = useMyPresence();

  // Update cursor coordinates on pointer move
  const handlePointerMove: PointerEventHandler = (e) => {
    const cursor = { x: Math.floor(e.clientX), y: Math.floor(e.clientY) };
    updatePresence({ cursor });
  };
  // Set cursor to null on pointer leave
  const handlePointerLeave: PointerEventHandler = (e) => {
    updatePresence({ cursor: null });
  };

  if (isStorageLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <img src="https://liveblocks.io/loading.svg" alt="Loading" />
        </div>
      </div>
    );
  }

  return (
    <ReactFlowProvider>
      <MainLayout
        header={<Avatars presence={presence} others={others} />}
        overlay={<></>}
        sidebar={<Sidebar />}
        footer={<></>}
        cursors={<></>}
        main={
          <Flow
            id={id}
            nodes={nodes}
            edges={edges}
            setNodes={setNodes}
            setEdges={setEdges}
            onEdgesChange={onEdgesChange}
            onNodesChange={onNodesChange}
          />
        }
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      />
      <RichTextModal />
    </ReactFlowProvider>
  );
};

export { FlowRoom };
