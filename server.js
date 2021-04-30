// const express = require('express');
// const connectDB = require('./DB/Connection')
// const app = express();

// connectDB();
// app.use(express.json({ extended: false }));
// app.use('/api/userModel', require('./Api/User'));
// const Port = process.env.Port || 6000;

// app.listen(Port, () => console.log('Server started'));











// //import express 
// const express = require('express')
// //extend express properties to my own server application
// const firstServerApp = express()
// const bodyParser = require('body-parser')

// //db connection string and connection function
// const MongoClient = require('mongodb').MongoClient;
// connectionString = "mongodb+srv://dbUser:dbUser@cluster0.d9min.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

// MongoClient.connect(connectionString,{useUnifiedTopology:true})
// .then(client=> {
//     console.log('connected to db')
//     const db = client.db('my-tasks')
//     const tasksCollection = db.collection('tasks')
//     firstServerApp.set('view engine','ejs')
// //Middlewares
    
//     firstServerApp.use(bodyParser.urlencoded({extended:true}))
//     firstServerApp.use(express.static('public'))

// //Routes
//     //CREATE 
//     firstServerApp.post('/tasks',(req,res) => {
//         tasksCollection.insertOne(req.body)
//         .then(result => {
//             res.redirect('/')
//         })
//         .catch(error => console.error(error)) 
//     })
//     //READ 
//     firstServerApp.get('/',(req,res) => {
//         //toArray
//         db.collection('tasks').find().toArray()
//         .then(results => {
//             res.render('index.ejs',{tasks:results})
//         })
//         .catch(error => console.error(error))
        
//     })
//     //UPDATE
//     firstServerApp.put('/tasks',(req,res)=>{
//         console.log(req.body)
//     })


// })

// //GET: get(endpoint,callback function)

// const Port = process.env.Port || 2000;

// firstServerApp.listen(Port, function() {
//     console.log('the server is up and active')
// })






//import express 
const express = require('express')
//extend express properties to my own server application
const firstServerApp = express()
const bodyParser = require('body-parser')

//db connection string and connection function
const MongoClient = require('mongodb').MongoClient;
connectionString = "mongodb+srv://dbUser:dbUser@cluster0.d9min.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

MongoClient.connect(connectionString,{useUnifiedTopology:true})
.then(client=> {
    console.log('connected to db')
    const db = client.db('my-tasks')
    const tasksCollection = db.collection('tasks')
    firstServerApp.set('view engine','ejs')
//Middlewares
    
    firstServerApp.use(bodyParser.urlencoded({extended:true}))
    
    firstServerApp.use(bodyParser.urlencoded({ extended: true }))
    firstServerApp.use(bodyParser.json())
    firstServerApp.use(express.static('public'))

//Routes
    //CREATE 
    firstServerApp.post('/tasks',(req,res) => {
        tasksCollection.insertOne(req.body)
        .then(result => {
            res.redirect('/')
        })
        .catch(error => console.error(error)) 
    })
    //READ 
    firstServerApp.get('/',(req,res) => {
        //toArray
        db.collection('tasks').find().toArray()
        .then(results => {
            res.render('index.ejs',{tasks:results})
        })
        .catch(error => console.error(error))
        
    })
    //UPDATE
    firstServerApp.put('/tasks',(req,res) => {
        //find a value and then update it 
        tasksCollection.findOneAndUpdate(
            {name:'Kavya'}, 
            {
                $set: 
            {
                name:req.body.name, 
                task:req.body.task
            }
            },
            {upsert: true}
        )
        .then(result => {console.log(result)})
        .catch(error => console.error(error))
    })
})

firstServerApp.delete('/tasks',(req,res)=>{
    tasksCollection.deleteOne({name:req.body.name})
    .then(result=>{
        if(result.deletedCount===0){
            return res.join('Nothing to delete')
        }
    }).catch(error=>console.log(error))
})

//GET: get(endpoint,callback function)

firstServerApp.listen(3010, function() {
    console.log('the server is up and active')
})