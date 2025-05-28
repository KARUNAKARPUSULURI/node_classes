const express = require('express');
const { dataRouter } = require('./Routes/dataRoutes');
const app = express();
const port = 6000;

app.use(express.json())
app.use("/", dataRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))