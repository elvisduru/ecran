import axios from "axios";

export const fetchScreens = async () => {
  try {
    const res = await axios.get("/api/campaigns/screens");
    return res.data.screens;
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

export const updateRequestByID = async (id, status) => {
  try {
    const res = await axios.put("/api/request/", { id, status });
    return res.data;
  } catch (error) {
    console.log("Error:", error);
  }
};
