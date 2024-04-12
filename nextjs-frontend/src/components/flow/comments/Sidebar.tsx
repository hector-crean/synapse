"use client";

import { CloseIcon } from "@/components/icons/CloseIcon";
import { DocumentCompleteIcon } from "@/components/icons/DocumentCompleteIcon";
import { DocumentMagnifyingIcon } from "@/components/icons/DocumentMagnifyingIcon";
import { PlusIcon } from "@/components/icons/PlusIcon";
import {
    ThreadMetadata,
    useThreads,
} from "@/liveblocks-configs/flow-room.config";
import { ThreadData } from "@liveblocks/client";
import { Thread } from "@liveblocks/react-comments";
import { useMemo } from "react";
import styles from "./Sidebar.module.css";

type Props = {
  onClose: () => void;
};

export function Sidebar({ onClose }: Props) {
  const { threads } = useThreads();

  const resolvedThreadCount = useMemo(() => {
    return threads.filter((thread) => thread.metadata.resolved).length;
  }, [threads]);

  return (
    <div className={styles.sidebarWrapper}>
      <div className={styles.sidebar} data-scrollbar="thin">
        <div className={styles.sidebarTop}>
          <div className={styles.sidebarThreadsResolved}>
            {resolvedThreadCount === threads.length ? (
              <DocumentCompleteIcon opacity="0.7" />
            ) : (
              <DocumentMagnifyingIcon opacity="0.7" />
            )}
            {resolvedThreadCount}/{threads.length} threads resolved
          </div>
          <button onClick={onClose} className={styles.sidebarClose}>
            <span className="sr-only">Close menu</span>
            <CloseIcon width={12} height={12} />
          </button>
        </div>
        <div className={styles.sidebarThreadList}>
          {threads.length ? (
            threads.sort(sortResolved).map((thread) => (
              <div
                key={thread.id}
                className={styles.sidebarThread}
                data-thread-resolved={thread.metadata.resolved || undefined}
              >
                <Thread thread={thread} indentCommentContent={false} />
              </div>
            ))
          ) : (
            <CreateThreadMessage />
          )}
        </div>
      </div>
    </div>
  );
}

function CreateThreadMessage() {
  return (
    <div>
      Create a thread with the{" "}
      <PlusIcon
        style={{ display: "inline", marginTop: "-2px" }}
        height={9}
        width={9}
      />{" "}
      plus icon in the toolbar.
    </div>
  );
}

function sortResolved(
  a: ThreadData<ThreadMetadata>,
  b: ThreadData<ThreadMetadata>
) {
  if (a.metadata.resolved && !b.metadata.resolved) {
    return 1;
  }

  if (!a.metadata.resolved && b.metadata.resolved) {
    return -1;
  }

  return 0;
}
