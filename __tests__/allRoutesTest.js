const express = require("express");
const mongoose = require("mongoose");
const allRoutes = require("../routes/allRoutes");
const request = require("supertest");
const PORT = process.env.PORT || 5000;
const app = express();

// Database connection
mongoose.connect("mongodb://127.0.0.1:27017/blogApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Body-parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/blogs", allRoutes);

// Variables for storing id of blogs
let blog1 = "";

// Adding 3 blogs in database
describe("post route - adding 3 blogs for testing", () => {
  it("POST /blogs on successful adding blogs", async () => {
    const { body, statusCode } = await request(app).post("/blogs").send({
      category: "Technology",
      title: "Introduction to Node.js",
      description: "A beginner's guide to Node.js",
      published_on: "2022-01-01",
    });
    expect(statusCode).toBe(200);
  });

  it("POST /blogs on successful adding blogs", async () => {
    const { body, statusCode } = await request(app).post("/blogs").send({
      category: "Food",
      title: "10 Easy Breakfast Recipes",
      description: "Quick and easy breakfast ideas for busy mornings",
      published_on: "2022-01-02",
    });
    expect(statusCode).toBe(200);
  });

  it("POST /blogs on successful adding blogs", async () => {
    const { body, statusCode } = await request(app).post("/blogs").send({
      category: "Travel",
      title: "Top 10 Tourist Destinations in Europe",
      description: "A guide to the best places to visit in Europe",
      published_on: "2022-01-03",
    });
    expect(statusCode).toBe(200);
  });
});

// Getting all blogs from database and storing id in global variables
describe("get route - to get all the blogs", () => {
  it("GET /blogs to successful getting all blogs", async () => {
    const { body, statusCode } = await request(app).get("/blogs");
    blog1 = body[0]._id;
    expect(statusCode).toBe(200);
  });
});

// Adding 2 comments on blog using id in params
describe("post route - to add 2 comments to blog 1", () => {
  it("POST /blogs/:id/comment", async () => {
    const { body, statusCode } = await request(app)
      .post(`/blogs/${blog1}/comment`)
      .send({
        comment: "Great article, very informative!",
      });
    expect(statusCode).toBe(200);
  });

  it("POST /blogs/:id/comment", async () => {
    const { body, statusCode } = await request(app)
      .post(`/blogs/${blog1}/comment`)
      .send({ comment: "Thanks for sharing!" });
    expect(statusCode).toBe(200);
  });
});

// Getting on blog in detail using id
describe("get route - to get blog 1 in detail with comments", () => {
  it("GET /blogs/:id/", async () => {
    const { body, statusCode } = await request(app).get(`/blogs/${blog1}`);
    expect(statusCode).toBe(200);
  });
});

// Getting all comments on single blog using blog id
describe("get route - to get all comments of blog 1", () => {
  it("GET /blogs/:id/comments", async () => {
    const { body, statusCode } = await request(app).get(
      `/blogs/${blog1}/comments`
    );
    expect(statusCode).toBe(200);
  });
});

// DESTROYING DATABASE AFTER COMPLETE TEST
afterAll(() => {
  mongoose.connection.db.dropDatabase()
});

// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
