const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://badgrav:ammagg291088@ds127993.mlab.com:27993/gammapedia';
var port = 1989;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => console.log('Node is running, API active at port: ' + port));

app.get('/', (req,res) => {
    res.send('<h1>Selamat datang di API MongoDB gammapedia');
});

app.get('/getuser', (req,res) => {
    MongoClient.connect(url, (err,db) => {
        userCol = db.collection('users');
        userCol.find({}).toArray((err1,docs) => {
            db.close();
            console.log(docs[1].julukan);
            res.send(docs);
        });
    });
});

app.post('/adduser', (req,res) => {
    console.log(req.body);
    MongoClient.connect(url, (err,db) => {
        userCol = db.collection('users');
        userCol.insertMany(req.body, (err1,result) => {
            db.close();
            res.send(result);
        });
    });
});