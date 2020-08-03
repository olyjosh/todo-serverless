const {db} = require('../util/admin')

exports.getAllTodos = (req, res) => {
    // let todos = [
    //     {id: 1, title: 'greetings', body: 'Hello from the other side'},
    //     {id: 2, title: 'We do', body: 'Just like that'},
    // ]
    // return res.send(todos);


    db
        .collection('todos')
        .orderBy('createdAt', 'desc')
        .get().then((data) => {
        let todos = []
        data.forEach((doc) => {
            todos.push({
                id: doc.id,
                title: doc.data().title,
                body: doc.data().body,
                createdAt: doc.data().createdAt,
            })
        })
        return res.json(todos);
    }).catch((err) => {
        console.log(err)
        return res.status(500).json({error: err.code});
    })
}

exports.postOneTodo = (request, response) => {
    if (request.body.body.trim() === '') {
        return response.status(400).json({body: 'Must not be empty'});
    }

    if (request.body.title.trim() === '') {
        return response.status(400).json({title: 'Must not be empty'});
    }

    const newTodoItem = {
        title: request.body.title,
        body: request.body.body,
        createdAt: new Date().toISOString()
    }
    db
        .collection('todos')
        .add(newTodoItem)
        .then((doc) => {
            const responseTodoItem = newTodoItem;
            responseTodoItem.id = doc.id;
            return response.json(responseTodoItem);
        })
        .catch((err) => {
            response.status(500).json({error: 'Something went wrong'});
            console.error(err);
        });
};


exports.deleteTodo = (request, response) => {

    let documentReference = db.doc('/todos/${request.params.id}')

    documentReference
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({error: 'Todo mot found'})
            }
            return documentReference.delete();
        })
        .then(() => {
            return response.json({message: 'Delete successful'})
        })
        .catch((err) => {
            response.status(500).json({error: 'Something went wrong'});
            console.error(err);
        });
};


exports.editTodo = ( request, response ) => {
    if(request.body.id || request.body.createdAt){
        response.status(403).json({message: 'Not allowed to edit'});
    }
    let document = db.collection('todos').doc(`${request.params.id}`);
    document.update(request.body)
        .then(()=> {
            response.json({message: 'Updated successfully'});
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({
                error: err.code
            });
        });
};

