const express = require('express')
const { getUsers } = require('./Controllers/userController')
const { getPosts } = require('./Controllers/postController')
const { getLikes } = require('./Controllers/likeController')
const app = express()
const port = 3000

app.get("/users", getUsers)
app.get("/posts", getPosts)
app.get("/likes", getLikes)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))