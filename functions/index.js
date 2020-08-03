const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


// exports.helloWorld = functions.https.onRequest(function (req, res) {
//     res.send("Hello from firebase functions")
// })
//
// exports.myHello = functions.https.onRequest((req, res)=>{
//     res.send("My defined hello")
// })
//
// exports.json = functions.https.onRequest((req, res)=>{
//     res.send({name: req.query.name})
// })

const app = require('express')();
const {getAllTodos, postOneTodo, editTodo, deleteTodo} = require('./APIs/todos')
const {loginUser, signUpUser} = require('./APIs/users')

app.get('/todos', getAllTodos)
app.post('/todos', postOneTodo)
app.put('/todos/:id', editTodo)
app.delete('/todos/:id', deleteTodo)

// Users
app.post('/login', loginUser)
app.post('/signup', signUpUser)


exports.api = functions.https.onRequest(app)