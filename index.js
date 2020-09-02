const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const realFs = require("fs");
const gracefulFs = require("graceful-fs");
gracefulFs.gracefulify(realFs);

const db = require("./db");

const auth = require("./routes/auth");
const campaigns = require("./routes/campaigns");
const request = require("./routes/request");
const atms = require("./routes/atms");
const verifyToken = require("./verifyToken");

// const dir = require("node-dir");

const { Request, Screen } = require("./models");
const { transformATMs } = require("./controllers/admin");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "/client/build")));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

global.__basedir = __dirname;

const whitelist = [
  "http://localhost:3000/",
  "http://localhost:5000/",
  "https://ecran.herokuapp.com",
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

io.on("connection", (socket) => {
  console.log("we have a new connection");

  socket.on("loadATMs", async (callback) => {
    try {
      const atms = await transformATMs();
      callback(atms);
    } catch (error) {
      callback(error);
    }
  });

  socket.on("disconnect", () => {
    console.log("user has left");
  });
});

app.get("/api/home", verifyToken, (req, res) => {
  res.send("Welcome!");
});

app.get("/regions", async (req, res) => {
  try {
    const regions = await db.collection("atms").distinct("Region");
    const regionsWithCount = await Promise.all(
      regions.map(async (Region) => {
        const count = await db.collection("atms").find({ Region }).count();
        return { region: Region, count };
      })
    );
    res.status(200).json(regionsWithCount);
  } catch (err) {
    console.log(err);
  }
});

app.get("/states", async (req, res) => {
  try {
    const states = await db.collection("atms").distinct("State");
    const statesWithCount = await Promise.all(
      states.map(async (State) => {
        const count = await db.collection("atms").find({ State }).count();
        return { state: State, count };
      })
    );
    res.status(200).json(statesWithCount);
  } catch (err) {
    console.log(err);
  }
});

app.get("/dates", async (req, res) => {
  try {
    const dates = await Request.find({ status: "Approved" }).select({
      _id: 0,
      dateRange: 1,
    });
    res.status(200).json(dates);
  } catch (err) {
    console.log(err);
  }
});

app.get("/logout", async (req, res) => {
  try {
    res.clearCookie("token");
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.get("/checkToken", verifyToken, (req, res) =>
  res.status(200).send(req.user)
);

app.use("/api/authenticate", auth);
app.use("/api/campaigns", campaigns);
app.use("/api/request", request);
app.use("/api/atms", atms);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
http.listen(port, () => console.log(`App is listening on port: ${port}!`));
