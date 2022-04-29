var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

var con = mysql.createConnection({
 host : 'localhost',
 user: 'root',
 password: '',
 port: '3306',
 database: 'test'
});

con.connect(function(err){
    if(err){
        console.log(err.message);
    }
    else{
        console.log("connected!!");
    }
});

app.post('/api/client/create-new',function(req, res){
    var clientsData ={
        id : req.body.id,
        name : req.body.name,
        createdat : req.body.createdat,
        createdby : req.body.createdby
    };
    let sqlQuery = " INSERT INTO client SET  ?";
    let query = con.query(sqlQuery, clientsData, function(err, result){
        if (err) throw err;
        res.send(JSON.stringify({"status": 200, "response": result}));
    });
});

app.get('/api/client/all-data', function(req, res){                   //GET method
    let  sqlQuery ="SELECT * FROM client";
       let query = con.query(sqlQuery, function(err, result){
         if (err) throw err;
         res.send(JSON.stringify({"status":200, "response":result}));
     });
     });

      app.put('/api/client/update-data/:id', (req, res)=>{                      //Update/ put
        sqlQuery = "UPDATE client SET name WHERE id="+req.params.id;
        query = con.query(sqlQuery, function(err, result){
           if (err) throw err;
           res.send(JSON.stringify({"status":200, "response":result}));
   });
}); 

app.delete('/api/client/delete-data/:id', (req, res)=>{                      //delete
        let sqlQuery = "DELETE FROM client WHERE id="+req.params.id;
    let query = con.query(sqlQuery, function(err, result){
       if (err) throw err;
       res.send(JSON.stringify({"status":200, "response":result}));
});
});

app.listen(8000, ()=>{
    console.log("server running");
});