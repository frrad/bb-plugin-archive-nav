---
name: archive-nav
description: Explain the Archive Nav plugin, which opens another thread instead of the new-thread screen after you archive the open thread.
---

# Archive Nav

Frontend-only plugin; it has no CLI commands, shortcuts, or settings.

When the thread you're viewing is archived (Mod+Shift+A, the row action, or
anything else), bb navigates to the new-thread screen. This plugin then opens:

1. the unread thread (bb's unread dot: idle or errored, unread) that most
   recently needed attention, else
2. the most recently updated thread.

Only top-level, visible, non-archived threads count. If none are left, you stay
on the new-thread screen. Going to the new-thread screen any other way is left
alone: the redirect only fires when the thread you left drops out of the active
list within 3 seconds.

Source: `~/Projects/bb-plugin-archive-nav` (path install; github.com/frrad/bb-plugin-archive-nav).
Tests: `node --test pick.test.ts`. Rebuild with `bb plugin build`, then
`bb plugin reload archive-nav`.
