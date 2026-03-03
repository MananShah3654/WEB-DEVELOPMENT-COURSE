import express from "express";
import { randomUUID } from "crypto";

const app = express();
const PORT = 3000;

// In-memory posts store (no database)
let posts = [
  {
    id: randomUUID(),
    title: "Welcome to My Blog",
    content:
      "This is the first post on this blog. Here you can share your thoughts, ideas, and stories with the world. Feel free to create, edit, and delete posts as you please. This platform is built with Node.js, Express, and EJS — a simple but powerful stack for web development.",
    author: "Admin",
    date: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  },
  {
    id: randomUUID(),
    title: "Getting Started with Node.js",
    content:
      "Node.js is a powerful JavaScript runtime built on Chrome's V8 engine. It allows developers to run JavaScript on the server side, enabling full-stack JavaScript development. With its non-blocking, event-driven architecture, Node.js is perfect for building scalable and high-performance web applications.",
    author: "Admin",
    date: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  },
];

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// ─── Routes ────────────────────────────────────────────────────────────────

// GET / — Home page: display all posts
app.get("/", (req, res) => {
  res.render("index", { posts });
});

// GET /new — Show new post form
app.get("/new", (req, res) => {
  res.render("new-post");
});

// POST /posts — Create a new post
app.post("/posts", (req, res) => {
  const { title, content, author } = req.body;
  const newPost = {
    id: randomUUID(),
    title: title.trim(),
    content: content.trim(),
    author: author.trim() || "Anonymous",
    date: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
  posts.unshift(newPost); // Add to the beginning so newest posts appear first
  res.redirect("/");
});

// GET /edit/:id — Show edit form for a specific post
app.get("/edit/:id", (req, res) => {
  const post = posts.find((p) => p.id === req.params.id);
  if (!post) return res.redirect("/");
  res.render("edit-post", { post });
});

// POST /posts/:id — Update a specific post
app.post("/posts/:id", (req, res) => {
  const { title, content, author } = req.body;
  const index = posts.findIndex((p) => p.id === req.params.id);
  if (index !== -1) {
    posts[index] = {
      ...posts[index],
      title: title.trim(),
      content: content.trim(),
      author: author.trim() || "Anonymous",
    };
  }
  res.redirect("/");
});

// POST /posts/:id/delete — Delete a specific post
app.post("/posts/:id/delete", (req, res) => {
  posts = posts.filter((p) => p.id !== req.params.id);
  res.redirect("/");
});

// ─── Start Server ───────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`Blog server running at http://localhost:${PORT}`);
});
