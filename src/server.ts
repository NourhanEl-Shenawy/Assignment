import * as express from 'express';
import * as bodyParser from 'body-parser';
const fs = require('fs');
var cors = require("cors");
const CircularJSON = require('circular-json');
let ID=0;
// Initialize todo list here
const todos_node = {
  allIds: [1,2,3],
  byIds: {1:{
    content: "Prepare Dinner",
    completed: false
  },
2: {
  content: "Do Shopping",
  completed: false
},
3: {
  content: "Read a book",
  completed: false
}}
};
//In order to apply MiddleWare:
//Middlewares function
function middleware(request: express.Request, response: express.Response, next) {

//Apply MiddleWare on all requests except GET health
  if(!(request.method === 'GET' && request.path === 'todo/App/api/health')){

    let stored_request = {
      header: request.headers,
      path: request.path,
      method: request.method,
      hostname: request.hostname
    };
    //Storing request in the file:
    var file_name = `${request.method}_${ID}`;
    ID=ID+1;
    fs.writeFile(file_name,CircularJSON.stringify(request),function (err) {
  if (err) return console.log(err);
  console.log('DONE');
});
//console.log(`${request.method} ${request.path}`);

//Storing response in the file:
let stored_response = 'RESPONSE:' + JSON.stringify(todos_node, null, 2);
//console.log(response);
  fs.appendFile(file_name, CircularJSON.stringify(response), function (err) {
  if (err) throw err;
  console.log('Saved!');
});
fs.appendFile(file_name, stored_response, function (err) {
if (err) throw err;
console.log('Saved Todo List!');
});
    next();
    // Second Middleware:
    const gateway_apikey= request.header('-x-Gateway-ApiKey'); //it should be fixed guid
    const token = request.header('-csrf-token'); //it should be eg.1
    if (token === "1"  && gateway_apikey === "fixed-guid"){
      console.log("Second MiddleWare Passed");
    }
    else {
      console.log("Second MiddleWare Failed");
      //response.send("ERROR");
    }
  }
else {
  console.log("No Middleware should be applied here");
}
}
const app = express();
app.use(middleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.text({ type: 'text/html' }));
app.use(bodyParser.text({ type: 'text/plain' }));
app.use(cors());
//Handle GET Request: todo/App/api/todos
app.get('/todo/App/api/todos/', (request, response) => {
//Retrieving the list of items:
//response.json(todos);
//response.json(todos_node);
console.log(todos_node);
console.log("GETTTT");
response.header("Access-Control-Allow-Origin", "*");
//response.send(tasks);
response.json(todos_node);
//response.json(todos_node);
//var body = todos_node;
//response.send(todos_node);
//response.setHeader('Access-Control-Allow-Origin', '*');
 //response.end(JSON.stringify(todos_node));
 //console.log(response);
// response.writeHead(200, {
//   'Access-Control-Allow-Origin' : '*',
//   'Content-Type': 'application/json' });
// response.writeHead(200, {
//     'Access-Control-Allow-Origin' : '*',
//     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
// });

});

//Handle POST Request: todo/App/api/todo. To add a new item to the list
app.post('/todo/App/api/todo/', (request, response) => {
  //The UI will send only the item (content)
  console.log(`POST: ${request.body}`);
  //Add the new item to the list
//  console.log(`POST: Request Body ID: $request.body.id`);
  console.log(`POST: Request Body Content: ${request.body.content}`);
  const index = todos_node.allIds.length;
  const next_index= index + 1;
  console.log(`The length of allIds is ${index}`);
  console.log(`Next Item will be inserted in ${next_index}`);
  //Insertion in allIds:
  todos_node.allIds.push(next_index);
console.log("allIds are: after update");
console.log(todos_node.allIds);
  todos_node.byIds = {
    ...todos_node.byIds,
    [next_index]: {
      content: request.body.content,
      completed: false
    }
  }
console.log("ByIds are: after update");
console.log(todos_node.byIds);
// //todos_node.push(request.body);
console.log(todos_node);
response.set('Access-Control-Allow-Origin', '*');
response.header("Access-Control-Allow-Origin", "*");
response.json(todos_node);
  //response.send('POST todo');
});

//Handle PATCH Request: todo/App/api/todo. PATCH is used to do partial change.
app.patch('/todo/App/api/todo', (request, response) => {
  //Will receive only the item and will search for it in the array.
  //console.log(`PATCH: ${request.body}`);
  //get the ID of the item and update it with the request.body
  // todos[request.body.id] = request.body;
  // console.log(todos);
 console.log(`PATCH request content is ${request.body.content}`);
 //console.log(`PATCH request completed is ${request.body.completed}`);
 let selected_id;
for (var i in todos_node.byIds){
  let item_content = todos_node.byIds[i].content;
  //console.log(i);
  console.log(item_content);
  if(item_content === request.body.content){
    console.log(`FOUND:  ${item_content}`);
    console.log(request.body.content);
  selected_id = i;
    console.log(`ID of Selected Item is ${selected_id}`);
  }
}
console.log(`Selected ID is ${selected_id}`);
  var complete_flag = todos_node.byIds[selected_id].completed;
   console.log(complete_flag);
  if(!(complete_flag)){
    todos_node.byIds[selected_id].completed = true; //Mark the item to completed
  }
  else {
    todos_node.byIds[selected_id].completed = false; //Mark the item to incomplete
  }
  console.log(todos_node);
response.set('Access-Control-Allow-Origin', '*');
response.header("Access-Control-Allow-Origin", "*");
response.json(todos_node);
 //response.send('PATCH todo');
});

//Handle DELETE Request: todo/App/api/todo
app.delete('/todo/App/api/todo/', (request, response) => {
//  console.log(request);
   console.log(`DELETE: ${request.query.content}`);
   //Search in byIds for the content:
   let selected_id;
   for (var i in todos_node.byIds){
     let item_content = todos_node.byIds[i].content;
  //   console.log(item_content);
     if(item_content === request.query.content){
       console.log(`DELETE FOUND:  ${item_content}`);
       console.log(request.query.content);
     selected_id = i;
       console.log(`DELETE ID of Selected Item is ${selected_id}`);
     }
   }

   //For allIds: Remove the ID from the array
console.log(`Before Update: allIds ${todos_node.allIds}`);
 const index = todos_node.allIds.indexOf(Number(selected_id));

 console.log(`INDEX is ${index}`);
todos_node.allIds.splice(index , 1 );
//delete todos_node.allIds[selected_id - 1];
console.log(`After Update: allIds ${todos_node.allIds}`);

  // //For ByIds: Remove the whole object corresponds to ID:
  console.log(`Before Update: By Ids ${todos_node.byIds}`);
  delete todos_node.byIds[selected_id];
    console.log(`After Update: By Ids ${todos_node.byIds}`);
  console.log(todos_node);
  //console.log(response);
  response.json(todos_node);
});

//Handle GET Request: todo/App/api/health
app.get('/todo/App/api/health/:id', function(request, response) {
  console.log(`GET HEALTH: ${request.params.id}`);
  response.send(todos_node[request.params.id]);
});

app.listen(81);
