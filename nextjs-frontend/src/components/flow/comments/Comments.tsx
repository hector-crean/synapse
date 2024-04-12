"use client";

import { CommentsOverlay } from "@/components/flow/comments/CommentsOverlay";
import { Toolbar } from "@/components/flow/comments/Toolbar";
import { ClientSideSuspense } from "@liveblocks/react";
import { ErrorBoundary } from "react-error-boundary";
import styles from "./Toolbar.module.css";

export function Comments() {
  return (
    /* @ts-ignore */
    <ErrorBoundary
      fallback={
        <div className={styles.toolbar}>
          An error occurred while loading threads.
        </div>
      }
    >
      <ClientSideSuspense fallback={null}>
        {() => (
          <>
            <Toolbar />
            <CommentsOverlay />
          </>
        )}
      </ClientSideSuspense>
    </ErrorBoundary>
  );
}
