const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const { Screen, Request } = require("../models/");
const db = require("../db");
const { bucket } = require("../utils");

const fetchScreens = async (req, res) => {
  try {
    const screens = await Screen.find({}).populate("request");
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

const updateRequest = async (req, res) => {
  try {
    const { id, fields } = req.body;
    if (fields.atmSelect === "region") {
      fields.atmSelectStates = [];
    }
    if (fields.atmSelect === "state") {
      fields.atmSelectRegion = [];
    }
    if (fields.approval) {
      fields.approval = JSON.parse(fields.approval);
      if (fields.approval === false) {
        fields.approvalDocument = null;
      }
    }

    const request = await Request.findByIdAndUpdate(id, fields, { new: true });
    res.status(200).json({ id, changes: fields });
  } catch (error) {
    console.log(error);
  }
};

// Campaigns

const updateScreen = async (req, res) => {
  try {
    const { id, fields } = req.body;
    const screen = await Screen.findByIdAndUpdate(id, fields, {
      new: true,
    }).populate("request");
    res.status(200).json({ id, changes: { fields, ...screen.request } });
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

const transformATMs = async () => {
  try {
    console.log("Checking ATMs");

    const atmsCursor = await db.collection("atms").find({});
    const atms = [];
    let count = 0;
    while (await atmsCursor.hasNext()) {
      console.log(`completed ${count}`);
      const atm = await atmsCursor.next();
      count++;
      const [screens] = await bucket.getFiles({
        prefix: `atms/${atm["Terminal ID"]}/S4PICT`,
      });

      atm.key = atm._id;

      // check atm screen stats
      atm.stats = {
        currentCampaign: [],
        oldCampaign: [],
        noCampaign: false,
        incompleteScreens: [],
        noScreen: false,
      };

      if (screens.length < 1) {
        atm.stats.noScreen = true;
      }

      if (Object.keys(atm.screens).length < 1) {
        atm.stats.noCampaign = true;
      }

      if (screens.length < 35) {
        atm.stats.incompleteScreens = screens.filter(
          (screen) =>
            !Object.keys(atm.screens).includes(
              screen.name.substring(
                screen.name.lastIndexOf("PIC"),
                screen.name.lastIndexOf(".")
              )
            )
        );
      }
      screens.forEach((screen) => {
        const screenName = screen.name.substring(
          screen.name.lastIndexOf("PIC"),
          screen.name.lastIndexOf(".")
        );
        const lastModified = new Date(screen.metadata.updated).getTime();

        if (lastModified === atm.screens[screenName].lastModified) {
          atm.stats.currentCampaign.push(atm.screens[screenName]);
        }

        if (lastModified < atm.screens[screenName].lastModified) {
          atm.stats.oldCampaign.push(atm.screens[screenName]);
        }
      });

      atms.push(atm);
    }
    console.log("Completed checking ATMs");
    return atms;
  } catch (error) {
    console.log(error);
  }
};

const checkAllATMs = async (req, res) => {
  try {
    const atms = await transformATMs();
    res.status(200).json(atms);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

exports.fetchScreens = fetchScreens;
exports.addRequest = addRequest;
exports.fetchRequests = fetchRequests;
exports.fetchATMs = fetchATMs;
exports.updateRequest = updateRequest;
exports.updateScreen = updateScreen;
exports.checkAllATMs = checkAllATMs;
exports.transformATMs = transformATMs;
