const express = require('express')
const app = express()
const fetch = require('node-fetch')


function todo(req, res){
    res.setHeader('Content-Type', 'application/json');
   fetch('https://jsonplaceholder.typicode.com/todos')
  .then(response => response.json())
  .then(json => 
    {
        for(var i=0; i<json.length; i++){
            var id = json[i].id;
            var title = json[i].title;
            var completed = json[i].completed;
            res.write(JSON.stringify({id:id, title:title,completed:completed}));
            res.write(",")
        }
        res.end();
    
  });
 
}
 
var getuserbyid = (req, res, next)=>{
    var userid = req.params.id;
    fetch('https://jsonplaceholder.typicode.com/users/'+userid)
   .then(response => response.json())
   .then(json =>{ 
        res.write(JSON.stringify(json));
        res.write(",")
        next();
    });
}

var gettodobyid =(req, res,next) =>{
    var usertodoid = req.params.id;
    fetch('https://jsonplaceholder.typicode.com/todos')
   .then(response => response.json())
   .then(json => 
     {
         for(var i=0; i<json.length; i++){
             var id = JSON.stringify(json[i].id);
             var title = json[i].title;
             var userid = JSON.stringify(json[i].userId);
             var completed = json[i].completed;
             if(userid == usertodoid ){
                res.write(JSON.stringify({id:id, title:title, userId: userid, completed:completed}));
                res.write(",")
             }
        }
         res.end();
         next();
     
   });
    
}


app.get('/todos', todo);
app.get('/getuser/:id',getuserbyid, gettodobyid);

app.listen('8001', ()=>{
    console.log("running");
})