// bb-plugin-archive-nav — frontend entry.
//
// When the open thread is archived, bb sends you to the new-thread screen.
// An invisible app overlay notices that move (the route loses its thread and
// that thread drops out of the active list) and opens another thread instead.
// With no active threads left it does nothing, so the new-thread screen stays.
import { useEffect, useRef } from "react";
import {
  definePluginApp,
  experimental_useSidebarThreads,
  useBbContext,
  useBbNavigate,
} from "@get-bb/plugin-sdk/app";
import { pickThreadAfterArchive } from "./pick.ts";

// How long after leaving a thread its archive may still show up in the list.
const ARCHIVE_SETTLE_MS = 3000;

interface Departure {
  threadId: string;
  at: number;
}

function ArchiveRedirect() {
  const { threadId } = useBbContext();
  const { threads, status } = experimental_useSidebarThreads();
  const navigate = useBbNavigate();
  const previousThreadId = useRef<string | null>(threadId);
  const departure = useRef<Departure | null>(null);

  useEffect(() => {
    const left = previousThreadId.current;
    previousThreadId.current = threadId;
    departure.current =
      threadId === null && left !== null ? { threadId: left, at: Date.now() } : null;
  }, [threadId]);

  useEffect(() => {
    const left = departure.current;
    if (left === null || threadId !== null || status !== "ready") return;
    if (Date.now() - left.at > ARCHIVE_SETTLE_MS) {
      departure.current = null;
      return;
    }
    const entry = threads.find((thread) => thread.id === left.threadId);
    // Still active: either you went to the new-thread screen on purpose, or
    // the archive hasn't reached the list yet. Wait for the next update.
    if (entry !== undefined && !entry.isArchived) return;
    departure.current = null;
    const target = pickThreadAfterArchive({ threads, archivedThreadId: left.threadId });
    if (target !== null) navigate.toThread(target);
  }, [threadId, threads, status, navigate]);

  return null;
}

export default definePluginApp((app) => {
  app.slots.experimental_appOverlay({ id: "archive-redirect", component: ArchiveRedirect });
});
