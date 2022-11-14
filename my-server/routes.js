
const { MongoClient } = require("mongodb");
var ObjectId = require('mongodb').ObjectID;
const uri = "mongodb://127.0.0.1:27017"
const client = new MongoClient(uri)

const ownerName = "Eeeason"
const passWord = "1234"

module.exports = function(app) {
    app.get('/',(req, res) => {
      console.log('server is being accessed')
      res.send('server is active')
    })
    
    app.route("/todo")
    .get(async(req, res) => {
      const result = await client.db("db").collection("todoItems").find({}).sort({ _id: -1 }).toArray();  
      res.send(result)
    })
    .post(async(req, res) => {
      var insertInfo = {
        "id": req.body.id,
        "owner":req.body.owner,
        "category":req.body.category,
        "title":req.body.title,
        "description":req.body.description,
        "content":req.body.content,
      }
      try{
        await client.db("db").collection("todoItems").insertOne(insertInfo); 
      }
      catch(err){}
      res.send("success")
    })
    .put(async(req, res) => {
      var updateInfo = {
        "id": req.body.id,
        "owner":req.body.owner,
        "category":req.body.category,
        "title":req.body.title,
        "description":req.body.description,
        "content":req.body.content,
      }
      try{
        const rer = await client.db("db").collection("todoItems").findOne(
          { _id: req.body.id }); 
        if(req.body.id === rer.id){
          await client.db("xxx").collection("todoItems").updateOne(
            { _id: req.body.id },
            {$set: updateInfo}
          ); 
        }
      }
      catch(err){
        console.log(err)
      }
      res.send("success")
    })

    .delete(async(req, res) => {
      var insertInfo = {
        "id": req.body.id,
        "owner":req.body.owner,
        "category":req.body.category,
        "title":req.body.title,
        "description":req.body.description,
        "content":req.body.content,
    }
      try{
        await client.db("db").collection("todoItems").deleteOne(insertInfo); 
      }
      catch(err){
        console.log(err)
      }
      res.send("success")
    })

    app.route("/search")
    .get(async(req, res) => {
      const result = await client.db("db").collection("todoItems").find(req.body.target).toArray();  
      res.send(result)
    })

    app.route("/login")
    .get(async(req, res) => {

      const result = await client.db("db").collection("users").find(req.body.userName); 
      if(result != null){ 
        if(result.passWord === req.body.passWord){
          res.send("logged in / access granted")
        }
      }
    })
    
  }