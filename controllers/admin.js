const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const { Screen, Request } = require("../models/");
const db = require("../db");

const fetchScreens = async (req, res) => {
  try {
    const screens = await Screen.find({});
    res.json({ screens });
  } catch (error) {
    console.log("Unable to fetch screens", error);
  }
};

const addRequest = async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    // form.uploadDir = path.join(__basedir, "/uploads/campaigns");
    form.keepExtensions = true;

    let request = {};
    form
      .parse(req)
      .on("field", (name, value) => {
        if (
          name === "dateRange" ||
          name === "atmSelectRegion" ||
          name === "atmSelectStates" ||
          name === "approval"
        ) {
          request[name] = JSON.parse(value);
        } else {
          request[name] = value;
        }
      })
      .on("fileBegin", (name, file) => {
        // file.path = form.uploadDir + "\\" + file.name;
        request[
          name
        ] = `https://firebasestorage.googleapis.com/v0/b/ecran-fe278.appspot.com/o/${file.name}?alt=media`;
      })
      // .on("file", (name, file) => {
      //   if (file.size === 0) {
      //     fs.unlink(file.path, (error) => {
      //       if (error) console.log(error);
      //     });
      //   }
      //   // request[name] = "/uploads/campaigns/" + file.name;
      // })
      .on("end", async () => {
        const newRequest = new Request(request);
        const savedRequest = await newRequest.save();
        res.status(200).json(savedRequest);
      });
  } catch (error) {
    console.log(error);
  }
};

const fetchRequests = async (req, res) => {
  try {
    const requests = await Request.find({}).sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    console.log(error);
  }
};

// ATMS

const fetchATMs = async (req, res) => {
  try {
    const atms = JSON.parse(req.query.atms);
    const type = req.query.type === "regions" ? "Region" : "State";
    const foundATMs = await db
      .collection("atms")
      .find({ [type]: { $in: atms } })
      .toArray();
    res.status(200).json(foundATMs);
  } catch (error) {
    console.log(error);
  }
};

exports.fetchScreens = fetchScreens;
exports.addRequest = addRequest;
exports.fetchRequests = fetchRequests;
exports.fetchATMs = fetchATMs;
