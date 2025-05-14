Node js -> To build server side applications.

Node js -> It is a run time envirnment where we can run our code outside the browser
It is Non-blocking I/O
It is built with V8 + C++
It is single threaded -> it receives the request and assign to workers
Node js is lightweight and scalable

Micro-services -> Node js


Node js -> chunks -> we will be receiving like pieces

{
    "name" : "karunakar",
    "age" : 30,
    "email" : "karunakar@gmail.com"
}
in the form of chunks -> pieces of data

{"name :
"karuna
kar","ag
e" : 30
,"emai
l" : "karun
akar@gm
ail.com"}

streams, event emitters -> 

event -> 
let bodyData = {"name :"karunakar","age" : 30,"email" : "karunakar@gmail.com"}

req.on("data", (chunk)=>{
    bodyData += chunk
})

middleware -> middle layer -> it has access to both req and res objs

Event driven Non-blocking I/0, 
Main thread
libUV
Thread pool
kernel I/O
event queue

event loop -> 
top level code
expired timers
----------------------------



{
    "full_name" : "chaitanya m",
    "first_name" : "chai",
    "last_name" : "m"
}

req.on(eventtype, callback)

let payload = ""; //

req.on("data", chunk => payload = payload + chunk.toString())

req.on("end", ()=>{
    
})


