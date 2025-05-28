const express = require("express");
const { getData, postData, updateData, deleteData } = require("../Controllers/dataController");

const dataRouter = express.Router();

dataRouter.get("/data", getData)
dataRouter.post("/data", postData)
dataRouter.put("/data/:id", updateData)
dataRouter.delete("/data/:id", deleteData)

module.exports = {dataRouter}