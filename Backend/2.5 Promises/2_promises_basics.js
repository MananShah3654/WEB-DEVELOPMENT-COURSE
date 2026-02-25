// ============================================================
// 2. PROMISES — THE SOLUTION TO CALLBACK HELL
// ============================================================
// A Promise is an object that represents the eventual
// completion (or failure) of an async operation.
//
// A Promise has 3 states:
//   - PENDING   → initial state, not yet settled
//   - FULFILLED → operation succeeded (.then runs)
//   - REJECTED  → operation failed (.catch runs)
//
// Syntax:
//   new Promise((resolve, reject) => { ... })
//     resolve(value) → fulfills the promise
//     reject(error)  → rejects the promise

// ─── Example 1: Basic Promise ────────────────────────────────
const myPromise = new Promise((resolve, reject) => {
  const success = true; // toggle this to test rejection

  setTimeout(() => {
    if (success) {
      resolve("Data loaded successfully!");
    } else {
      reject(new Error("Something went wrong!"));
    }
  }, 1000);
});

myPromise
  .then((result) => console.log("Fulfilled:", result))
  .catch((err) => console.log("Rejected:", err.message))
  .finally(() => console.log("Promise settled (always runs)"));

// ─── Example 2: Wrapping the callback functions in Promises ──
// Now the same getUser / getOrders / getOrderDetails as before,
// but returning Promises instead of taking callbacks.

function getUser(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("\nFetched user");
      resolve({ id: userId, name: "Alice" });
    }, 500);
  });
}

function getOrders(user) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Fetched orders for", user.name);
      resolve(["Order#1", "Order#2"]);
    }, 500);
  });
}

function getOrderDetails(order) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Fetched details for", order);
      resolve({ item: "Laptop", price: 999 });
    }, 500);
  });
}

// ─── Promise Chaining (flat, readable, no nesting!) ──────────
getUser(1)
  .then((user) => getOrders(user))       // each .then returns next promise
  .then((orders) => getOrderDetails(orders[0]))
  .then((details) => console.log("Final result:", details))
  .catch((err) => console.log("Error:", err.message));  // ONE catch for all

// Run: node 2_promises_basics.js
