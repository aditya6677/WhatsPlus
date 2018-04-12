
var express=require('express');
var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded());
var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'hack17',
  database : 'hack'
});
connection.connect()
//'SELECT * FROM `doctors` WHERE id='
//'SELECT id FROM `diseases` WHERE name=?',[bimari]
app.get('/:id',function(req,res){
  var adi=req.params.id;
  var str=adi.substring(1,adi.length);
  var arr=adi.split(",");
  if(arr.length===1){
    var bimari=arr[0].toLowerCase();
    connection.query('SELECT * FROM `diseases` where name=?',[bimari],function(err,results){
      if(!err){
          //console.log(results);
          res.json({disease : results});
      }
    });
  }
  else if(arr.length===2){
    var bimari=arr[0].toLowerCase();
    var doct=arr[1].toLowerCase();
    connection.query('SELECT ID FROM `diseases` WHERE name=?',[bimari],function(err,results){
      if(!err){
        var a=results[0].ID;
        connection.query('SELECT * FROM `doctors` WHERE diseaseId=?',[a],function(err,data){
          if(!err){
            res.json({doctors : data});
          }
        });
      }
    });
  }
  else{
    res.json("Wrong Input");
  }
});

app.get('/list/hospitals',function(req,res){
  connection.query('SELECT * FROM `hospitals`',function(err,results){
    res.json({hospitals : results});
  });
});

app.get('/list/doctors',function(req,res){
  connection.query('SELECT * FROM `doctors`',function(err,results){
    var data=[];
    for(var id in results){
      data.push(results[id].name);
    }
    res.json({doctors : data});
  });
});

app.listen(7676);
