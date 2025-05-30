const express = require("express");
const mongoose = require("mongoose");
const { userRouter } = require("./Routers/userRouter");

const app = express();
const PORT = 5000 || 10000;
const URI = "mongodb://localhost:27017/"

app.use(express.json());

//write the logic here 

app.use("/users", userRouter)


mongoose.connect(URI)
.then(()=> console.log("connected"))
.catch((err) => console.log("error", err.message))

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})