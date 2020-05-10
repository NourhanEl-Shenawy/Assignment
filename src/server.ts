import * as express from 'express';
import * as bodyParser from 'body-parser';
const fs = require('fs');

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
    fs.writeFile('Middleware1',JSON.stringify(stored_request),function (err) {
  if (err) return console.log(err);
  console.log('DONE');
});
//console.log(`${request.method} ${request.path}`);

//Storing response in the file:
let stored_response = 'RESPONSE:' + JSON.stringify(todos, null, 2);
    fs.appendFile('Middleware1', stored_response, function (err) {
  if (err) throw err;
  console.log('Saved!');
});
    next();
  }
else {
  console.log("No Middleware should be applied here");
}
// Second Middleware:
const gateway_apikey= request.header('-x-Gateway-ApiKey'); //it should be fixed guid
const token = request.header('-csrf-token'); //it should be eg.1
if (token === "1"  && gateway_apikey === "fixed-guid"){
  console.log("Second MiddleWare Passed");
}
else {
  console.log("Second MiddleWare Failed");
}
}
const app = express();
app.use(middleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
//Handle GET Request: todo/App/api/todos
app.get('/todo/App/api/todos/', (request, response) => {
//Retrieving the list of items:
response.json(todos);
});

//Handle POST Request: todo/App/api/todo
app.post('/todo/App/api/todo/', (request, response) => {
  console.log(`POST: ${request.body}`);
  //Add the new item to the list
  todos.push(request.body);
// todos.remove(request.params.id);
  console.log(todos);
  response.send('POST todo');
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
