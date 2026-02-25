// ============================================================
// 1. THE PROBLEM: CALLBACK HELL
// ============================================================
// Before Promises existed, async operations were handled with
// callbacks. Nesting many callbacks creates "callback hell" —
// hard-to-read, hard-to-maintain pyramid-shaped code.

// Simulating async operations (e.g. reading files, DB queries)
// with setTimeout to mimic a delay

function getUser(userId, callback) {
  setTimeout(() => {
    console.log("Fetched user");
    callback({ id: userId, name: "Alice" });
  }, 1000);
}

function getOrders(user, callback) {
  setTimeout(() => {
    console.log("Fetched orders for", user.name);
    callback(["Order#1", "Order#2"]);
  }, 1000);
}

function getOrderDetails(order, callback) {
  setTimeout(() => {
    console.log("Fetched details for", order);
    callback({ item: "Laptop", price: 999 });
  }, 1000);
}

// This works, but look at the deep nesting ↓ (callback hell)
getUser(1, (user) => {
  getOrders(user, (orders) => {
    getOrderDetails(orders[0], (details) => {
      console.log("Final result:", details);
      // Imagine even more nesting here... nightmare!
    });
  });
});

// Run: node 1_callbacks.js
