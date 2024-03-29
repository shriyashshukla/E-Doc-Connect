// import express
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");


const UserRouter = require("../backend/Router/userRouter");
const DoctorRouter = require("../backend/Router/doctorRouter");
const ServiceRouter = require("../backend/Router/serviceRouter");
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
app.use("/doctor", DoctorRouter);
app.use("/service", ServiceRouter);


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

app.get("/getbyid", (req, res) => {
  const id = req.query.id;
  console.log(`Request for user with id ${id}`);
  if (!isNaN(Number(id))) {
    res.send(`response from getbyid with id ${id}`);
  } else {
    res.send("Invalid id");
  }
});




// starting the server
httpServer.listen(port, () => {
  console.log("express server started");
});
