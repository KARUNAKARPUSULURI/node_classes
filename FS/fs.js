// const fs = require("fs")
// const path = require("path")

// const demo = path.resolve("Demo")
// fs.rm(demo, {recursive: true}, ()=>{
//     console.log("deleted")
// })

// fs.rmdir(demo, ()=>{
//     console.log("deleted")
// })

// fs.mkdir("Demo", { recursive: true }, (err, data) => { //D://28_29R_NODEJS/DEMO/demo.js
//     if (err) console.log(err);
//     else {
//         fs.writeFile(path.join(data, "demo.js"), JSON.stringify({ name: "karunakar" }), () => {
//             console.log("file saved")
//         })
//     }
// })
// const filePath = path.resolve("alph.txt");

// console.log(fs.existsSync(filePath))

// fs.writeFile(filePath, "hello", ()=>{
//     console.log("file created")
// })

// if(fs.existsSync(filePath)){
//     fs.unlink(filePath, ()=>{
//         console.log("deleted")
//     })
// }else{
//     console.log("erer")
// }

// fs.unlink(filePath, ()=>{
//     console.log("deleted")
// })
//{"name": "name"}{"age": 30}
// fs.appendFile(filePath, "hello world 3 \n", ()=>{
//     console.log("file updated")
// })

// const filePath = path.resolve("Scripts", "index.js")
// console.log(filePath)
// console.log("1")
// const overwritten = fs.writeFileSync(filePath, JSON.stringify({name: "name"}))
// console.log("2")
// console.log("3")

//write file

// fs.writeFile(filePath, JSON.stringify({name : "karunakar", age : 30}), ()=>{
//     console.log("file saved")
// })

// fs.writeFile(filePath, "console.log('HI, This file has been overwritten by fs.js writeFile, Hello Node js')", ()=>{
//     console.log("file updated")
// })


// console.log("1")
// const pathFile = path.resolve(path.join("Path_Module", "path.js"))
// fs.readFile(pathFile, "UTF-8",  (err, data)=>{
//     if(err) console.log("im here")
//     else console.log("2", data)
// });
// console.log("3")

// console.log("1")
// const pathFile = path.resolve(path.join("Path_Module", "path.js"))
// const fs2 = fs.readFileSync(pathFile, "UTF-8");
// console.log("2", fs2)
// console.log("3")