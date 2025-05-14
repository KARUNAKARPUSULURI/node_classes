// import path from "path"
const path = require("path")
const os = require("os")

// console.log(os.platform());
// const filePath = "D://28_29r_nodejs..//Path_Module.//index.js";

// // const file2 = "D:\\28_29_nodejs\\Path_Module\\node_modules";
// console.log(path.normalize(filePath))
// console.log(module)

// resolve -> parent folder -> D://28_29r_nodejs/hello/hi/world
// console.log(path.resolve("hello", "hi", "world"))
// console.log(path.resolve(path.join("Scripts", "index.js")));
// console.log(path.parse(filePath))
// console.log(path.join("hello", "hi", "world")) //hello/hi/world
// const introFilePath = path.resolve("intro.md")
// console.log(introFilePath)
// console.log(path.resolve("intro.md")) //D://28_29_nodejs
// console.log(path.resolve("Scripts", "index.js")) //D://28_29_nodejs/scripts/index.js
// const obj = {
//     root: 'D:/',
//     dir: 'D://28_29r_nodejs/Path_Module',
//     base: 'index.js',
//     ext: '.js',
//     name: 'index'
// }
// console.log(path.format(obj))
// const obj = {
//     basename : "index.js",
//     extname : ".js",
//     dirname : "D://28_29r_nodejs/Path_Module"
// }

// console.log(__filename) || console.log(module.filename)
// console.log(__dirname) || console.log(module.path)
// console.log(path.extname(filePath))
// console.log(path.dirname(filePath))
// if(path.isAbsolute(filePath)){
//     console.log("5", path.basename(filePath))
// }else{
//     console.log("failed")
// }
// console.log(path.isAbsolute(JSON.stringify({})))
//isAbsolute ->
// -> \ -> /

//access file paths
//-> basename
//access directory path
//-> dirname
//D://resume.pdf
//extract the extension -> extname
//check whether the given path is absolute or not?
//-> isAbsolute
//path conversion -> obj -> path, path -> obj
//-> Parse, format
//can you create or construct your own path?
//-> YES, I CAN. JOIN, RESOLVE

// {
//     resolve: [Function: resolve],
//     normalize: [Function: normalize],
//     isAbsolute: [Function: isAbsolute],
//     join: [Function: join],
//     dirname: [Function: dirname],
//     basename: [Function: basename],
//     extname: [Function: extname],
//     format: [Function: bound _format],
//     parse: [Function: parse],
//   }