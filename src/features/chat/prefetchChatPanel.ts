/*
 * Warms the lazy panel chunk before it is needed. Shared by the dock launcher
 * and the hero button, so whichever the visitor reaches first pays no wait.
 * Same specifier as the lazy() call, so Vite emits one chunk.
 */
export function prefetchChatPanel(): void {
  void import('./ChatPanel')
}
