// ============================================================
// 2.5 PROMISES & ASYNC/AWAIT — INDEX
// ============================================================
// Run this file to see a quick summary of all concepts.
// Or run each numbered file individually for details.
//
// Files in this folder:
//   1_callbacks.js          — The problem: callback hell
//   2_promises_basics.js    — Promises: new Promise, .then, .catch
//   3_async_await.js        — async/await syntax + error handling
//   4_promise_combinators.js — Promise.all / allSettled / race / any
//   5_real_world_mini_app.js — Mini weather dashboard app
// ============================================================

// ─── Quick reference ─────────────────────────────────────────
console.log(`
╔══════════════════════════════════════════════════════════╗
║            PROMISES & ASYNC/AWAIT CHEAT SHEET            ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  PROMISE STATES                                          ║
║    pending   → not settled yet                           ║
║    fulfilled → resolved (success)                        ║
║    rejected  → rejected (failure)                        ║
║                                                          ║
║  CREATING A PROMISE                                      ║
║    new Promise((resolve, reject) => {                    ║
║      resolve(value);   // fulfills                       ║
║      reject(error);    // rejects                        ║
║    });                                                   ║
║                                                          ║
║  CONSUMING A PROMISE                                     ║
║    promise                                               ║
║      .then(result => ...)   // on success                ║
║      .catch(err   => ...)   // on failure                ║
║      .finally(()  => ...)   // always                    ║
║                                                          ║
║  ASYNC / AWAIT                                           ║
║    async function myFn() {                               ║
║      try {                                               ║
║        const data = await somePromise();                 ║
║      } catch (err) { ... }                               ║
║    }                                                     ║
║                                                          ║
║  COMBINATORS (parallel execution)                        ║
║    Promise.all([p1,p2])        → all must succeed        ║
║    Promise.allSettled([p1,p2]) → get all results         ║
║    Promise.race([p1,p2])       → first to settle wins    ║
║    Promise.any([p1,p2])        → first to succeed wins   ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
`);

// ─── Run all demos ───────────────────────────────────────────
console.log("Run individual files to see each concept in action:\n");
console.log("  node 1_callbacks.js");
console.log("  node 2_promises_basics.js");
console.log("  node 3_async_await.js");
console.log("  node 4_promise_combinators.js");
console.log("  node 5_real_world_mini_app.js");
