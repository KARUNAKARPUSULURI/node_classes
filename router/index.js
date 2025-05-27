const express = require('express');
const { userRouter } = require('./Routes/userRoutes');
const { postRouter } = require('./Routes/postRoutes');
const app = express()
const port = 5000;

app.use("/", userRouter) //crud -> getall, getbyid, post,put, patch, delete
app.use("/hello", postRouter)

// //users
// app.get()
// app.post()
// app.put()
// app.delete()
// //post
// app.get()
// app.post()
// app.put()
// app.delete()

app.listen(port, () => console.log(`Example app listening on port ${port}!`))