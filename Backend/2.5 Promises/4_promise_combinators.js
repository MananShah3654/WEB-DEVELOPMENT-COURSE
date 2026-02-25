// ============================================================
// 4. PROMISE COMBINATORS
// ============================================================
// When you have MULTIPLE independent promises, run them in
// parallel instead of awaiting one by one.

// ─── Helper: simulates a delayed fetch ───────────────────────
function fetchData(label, delay, shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error(`${label} failed!`));
      } else {
        resolve(`${label} data`);
      }
    }, delay);
  });
}

// ─── Promise.all ─────────────────────────────────────────────
// Waits for ALL promises to fulfill.
// If ANY rejects → the whole thing rejects immediately.
// Use when you need ALL results and can't proceed without them.

async function demoAll() {
  console.log("=== Promise.all ===");
  try {
    const results = await Promise.all([
      fetchData("Users",    300),
      fetchData("Products", 500),
      fetchData("Orders",   200),
    ]);
    console.log("All resolved:", results);
    // All 3 run in parallel — total wait ≈ 500ms (slowest one)
  } catch (err) {
    console.log("One failed:", err.message);
  }
}

// ─── Promise.allSettled ──────────────────────────────────────
// Waits for ALL promises regardless of pass/fail.
// Returns an array of { status, value/reason } objects.
// Use when you want ALL results, even partial failures.

async function demoAllSettled() {
  console.log("\n=== Promise.allSettled ===");
  const results = await Promise.allSettled([
    fetchData("Users",    300),
    fetchData("Products", 100, true), // this one fails
    fetchData("Orders",   200),
  ]);

  results.forEach(({ status, value, reason }) => {
    if (status === "fulfilled") {
      console.log("OK:", value);
    } else {
      console.log("FAIL:", reason.message);
    }
  });
}

// ─── Promise.race ────────────────────────────────────────────
// Resolves/rejects as soon as the FIRST promise settles.
// Use for timeouts or "fastest wins" scenarios.

async function demoRace() {
  console.log("\n=== Promise.race ===");

  // Timeout pattern: reject if takes longer than 250ms
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout!")), 250)
  );

  try {
    const result = await Promise.race([
      fetchData("SlowAPI", 400), // too slow
      timeout,
    ]);
    console.log("Won race:", result);
  } catch (err) {
    console.log("Race error:", err.message); // Timeout! wins
  }
}

// ─── Promise.any ─────────────────────────────────────────────
// Resolves as soon as the FIRST promise FULFILLS.
// Only rejects if ALL reject (AggregateError).
// Use for "first success" scenarios.

async function demoAny() {
  console.log("\n=== Promise.any ===");
  try {
    const result = await Promise.any([
      fetchData("Mirror1", 500, true),  // fails
      fetchData("Mirror2", 200),         // succeeds first
      fetchData("Mirror3", 300),
    ]);
    console.log("First success:", result);
  } catch (err) {
    console.log("All failed:", err);
  }
}

// Run all demos sequentially
(async () => {
  await demoAll();
  await demoAllSettled();
  await demoRace();
  await demoAny();
})();

// Run: node 4_promise_combinators.js
