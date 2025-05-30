Step 1 : - 
    Server.js -> Mongodb connection ? 
    npm install mongoose
    const URI = "mongodb://localhost:27017/" -> test -> test -> data stores
    monogoose.connect(URI).then(()=> console.log("connected")).catch((err) => console.log("connection error"))

    server.js -> {

        const URI = "mongodb://localhost:27017/"
        mongoose.connect(URI)
        .then(() => console.log("connected"))
        .catch(() => console.log("failed"))
    }
----------------------------------------------------------------------------------

Step 2:- creating schemas and models

1. app.use(express.json())
2. Need to create a schema -> mongoose.Schema({})
const UserSchema = new mongoose.Schema({
    name : String,
    age : Number
})


const userSchema = new mongoose.Schema({})

module.exports = mongoose.Model("User", userSchema)

UserSchema {
    name : String,
    age : Number
}

<!-- Hello hello = new Hello(); -->

Model
--------------------------------------------------
Step 3 :- 

 -> logic -> controllers -> 

 -> route -> routers

 -> middleware - app.use()