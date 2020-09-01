import axios from "axios";

// export const fetchATMs = async () => {
//   try {

//   } catch (error) {
//     console.log(error);
//   }
// };

export const fetchScreens = async () => {
  try {
    const res = await axios.get("/api/campaigns/");
    res.data.screens.forEach((item) => (item.key = item._id));
    return res.data.screens;
  } catch (error) {
    console.log(error);
  }
};

export const addNewRequest = async (fields) => {
  try {
    const res = await axios.post("/api/request/new", fields);
    res.data.key = res.data._id;
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getRequests = async () => {
  try {
    const res = await axios.get("/api/request/");
    res.data.forEach((item) => (item.key = item._id));
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateRequestByID = async (id, fields) => {
  try {
    const res = await axios.put("/api/request/", { id, fields });
    return res.data;
  } catch (error) {
    console.log("Error:", error);
  }
};

export const updateScreenByID = async (id, fields) => {
  try {
    const res = await axios.put("/api/campaigns/", { id, fields });
    return res.data;
  } catch (error) {
    console.log("Error:", error);
  }
};
