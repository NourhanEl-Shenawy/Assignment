import * as express from 'express';
import * as bodyParser from 'body-parser';
const fs = require('fs');
const CircularJSON = require('circular-json');
// Initialize todo list here
var todos = [
  {
    id:0,
    title:'buy the milk'
  }, {
    id:1,
    title:'rent a car'
  }, {
    id:2,
    title:'feed the cat'
  }
];


  var tasks: ["Workout","Study"];
const todos_node = {
  allIds: [1,2,3],
  byIds: {1:{
    content: "Prepare Breakfast",
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
    fs.writeFile('Middleware1',CircularJSON.stringify(request),function (err) {
  if (err) return console.log(err);
  console.log('DONE');
});
//console.log(`${request.method} ${request.path}`);

//Storing response in the file:
let stored_response = 'RESPONSE:' + JSON.stringify(todos, null, 2);
//console.log(response);
  fs.appendFile('Middleware1', CircularJSON.stringify(response), function (err) {
  if (err) throw err;
  console.log('Saved!');
});
fs.appendFile('Middleware1', stored_response, function (err) {
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
 console.log(response);
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
  console.log(`POST: ${request.body}`);
  //Add the new item to the list
  //var json = JSON.parse(todos_node);

  console.log(`POST: Request Body ID: $request.body.id`);
  console.log(`POST: Request Body Content: $request.body.content`);
  console.log(todos_node.allIds.push(request.body.id));
    console.log("allIds are: after update");
  console.log(todos_node.allIds);
  todos_node.byIds = {
    ...todos_node.byIds,
    [request.body.id]: {
      content: request.body.content,
      completed: false
    }
  }
  console.log("ByIds are: after update");
    console.log(todos_node.byIds);
//todos_node.push(request.body);
//  console.log(todos_node);
response.set('Access-Control-Allow-Origin', '*');
response.header("Access-Control-Allow-Origin", "*");
response.json(todos_node);
  //response.send('POST todo');
});

//Handle PATCH Request: todo/App/api/todo. PATCH is used to do partial change.
app.patch('/todo/App/api/todo', (request, response) => {
  console.log(`PATCH: ${request.body}`);
  //get the ID of the item and update it with the request.body
  todos[request.body.id] = request.body;
  console.log(todos);
  response.send('PATCH todo');
});

//Handle DELETE Request: todo/App/api/todo
app.delete('/todo/App/api/todo', (request, response) => {
   console.log(`DELETE: ${request.body.id}`);
   const delete_index = Number(request.body.id);
   console.log(delete_index);
   todos.splice(delete_index,1);
  console.log(todos);
  response.send('DELETE todo');
});

//Handle GET Request: todo/App/api/health
app.get('/todo/App/api/health/:id', function(request, response) {
  console.log(`GET HEALTH: ${request.params.id}`);
  response.send(todos[request.params.id]);
});

app.listen(81);
