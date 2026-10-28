NOW (0.5)   demo as a test          fixture file map, in-process
   |
Phase 1     demo on a real repo     extractor reads a real directory,
   |                                git SHA + real content digest pinning.
   |                                Still advisory. Falsifies: does the
   |                                extractor's honesty survive messy code?
   |
Phase 2     agent surface           MCP server: admitEffect as the tool an
   |                                agent must call to write files. First
   |                                place "advisory" can honestly start
   |                                becoming "enforced" (if the tool is the
   |                                only write path).
   |                                Falsifies: do agents actually route
   |                                through it, or trivially bypass?
   |
Phase 3     the deferred six        Pull AD-09/14 (exceptions), AD-15
   |                                (invalidation), etc. forward one at a
   |                                time — only when a real usage demands
   |                                them, never speculatively.
   |
Phase 4     other humans            Put it in front of 3-5 engineers with
                                    real repos. First external validation
                                    since the project began.