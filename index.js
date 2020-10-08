const express = require('express')
const cors =require('cors')
const bodyParser = require('body-parser')

const app = express()
const port = 5000;

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://emaJhonSimple:emaJhonSimple69@cluster0.ynfam.mongodb.net/allProduct?retryWrites=true&w=majority";

app.use(cors())
app.use(bodyParser.json())



const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("allProduct").collection("product");
  const orderCollection = client.db("allProduct").collection("orders");
   
    app.post('/addProduct',(req, res) => {
      const product=req.body
     collection.insertOne(product)
     .then(result=>{
       console.log(result.insertedCount)
        res.send(result.insertedCount)
      })
    })
    app.get('/products',(req, res)=>{
      collection.find({}).limit(20)
      .toArray((err,documents)=>{
        res.send(documents)
      })
    })
    app.get('/productKey/:key',(req, res)=>{
      collection.find({key:req.params.key})
      .toArray((err,documents)=>{
        res.send(documents[0])
      })
    })
  app.post('/groupProductKey',(req, res)=>{
    const productKey=req.body;
    collection.find({key:{$in:productKey}})
    .toArray((err,documents)=>{
      res.send(documents)
    })
  })
});

app.post('/addProduct',(req, res) => {
  const product=req.body
 orderCollection.insertOne(product)
 .then(result=>{
    res.send(result.insertedCount>0)
  })
})
app.get('/', (req, res) =>{
  res.send('Hello World!')
})
app.listen(port)