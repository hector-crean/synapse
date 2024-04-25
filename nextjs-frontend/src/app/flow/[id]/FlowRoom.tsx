import { COLORS } from "@/color";
import { Avatar } from "@/components/avatar/Avatar";
import { Flow } from "@/components/flow/Flow";
import { MainLayout } from "@/layouts/MainLayout";
import {
  Presence,
  UserMeta,
  useLiveblocksFlowStore,
  useMyPresence,
  useOthers,
} from "@/liveblocks-configs/flow-room.config";
import { User } from "@liveblocks/client";
import { ReactFlowProvider } from "@xyflow/react";
import { useEffect } from "react";
import styles from "./Room.module.css";

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
  } = useLiveblocksFlowStore();

  // Enter the Liveblocks room on load
  useEffect(() => {
    enterRoom(id);
    return () => leaveRoom();
  }, [enterRoom, leaveRoom, id]);

  const others = useOthers();
  const userCount = others.length;
  const [presence] = useMyPresence();

  // Update cursor coordinates on pointer move

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
        sidebar={<></>}
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

      />
    </ReactFlowProvider>
  );
};

export { FlowRoom };
