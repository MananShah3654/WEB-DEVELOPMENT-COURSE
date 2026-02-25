// ============================================================
// 3. ASYNC / AWAIT — SYNTACTIC SUGAR OVER PROMISES
// ============================================================
// async/await makes asynchronous code look and behave like
// synchronous code. Under the hood it's still Promises.
//
// Rules:
//   • async keyword before a function makes it return a Promise
//   • await pauses execution INSIDE the async function until
//     the Promise resolves/rejects
//   • await can ONLY be used inside an async function

// ─── Helper functions (same as before, returning Promises) ───
function getUser(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: userId, name: "Alice" }), 500);
  });
}

function getOrders(user) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(["Order#1", "Order#2"]), 500);
  });
}

function getOrderDetails(order) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ item: "Laptop", price: 999 }), 500);
  });
}

// ─── Example: Same logic but with async/await ────────────────
async function showOrderDetails() {
  // Each line waits for the previous one to finish
  const user    = await getUser(1);
  console.log("User:", user.name);

  const orders  = await getOrders(user);
  console.log("Orders:", orders);

  const details = await getOrderDetails(orders[0]);
  console.log("Details:", details);

  return details; // async functions always return a Promise
}

showOrderDetails().then((d) => console.log("Done:", d));

// ─── Error Handling with try/catch ───────────────────────────
function riskyOperation() {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("Network timeout!")), 300);
  });
}

async function safeRun() {
  try {
    const result = await riskyOperation();
    console.log("Result:", result);
  } catch (err) {
    // Catches rejected promises — equivalent to .catch()
    console.log("Caught error:", err.message);
  } finally {
    console.log("Always runs after try/catch");
  }
}

safeRun();

// ─── async function always returns a Promise ─────────────────
async function add(a, b) {
  return a + b;          // wrapped in Promise.resolve() automatically
}

add(3, 4).then(console.log); // logs 7

// Run: node 3_async_await.js
