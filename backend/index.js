// import express
const express = require("express");
const { createServer } = require("http");

const { Server } = require("socket.io");


const UserRouter = require("../backend/Router/userRouter");
const utilRouter = require("../backend/Router/utils");
const cors = require("cors");

// initialize express
const app = express();
const port = 5000;
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: ["http://localhost:3000"] }});

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.use("/user", UserRouter);
app.use("/util", utilRouter);

app.use(express.static("./uploads"));

// routes
app.get("/", (req, res) => {
  res.send("response from index");
});

app.get("/home", (req, res) => {
  res.send("response from home");
});

app.get("/add", (req, res) => {
  res.send("response from add");
});

app.get("/getall", (req, res) => {
  res.send("response from getall");
});


io.on("connection", (socket) => {
  console.log("a user connected");
  console.log(socket.id);
  // socket.emit("hello", "world");
});

// home
// add
// getall

// starting the server
httpServer.listen(port, () => {
  console.log("express server started");
});
