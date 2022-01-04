var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
const path = require('path');

mongoose.connect('mongodb+srv://ferlie_db:rfVR6HTWwYZ4uq3N@cluster0.m0vzp.mongodb.net/todolist?retryWrites=true&w=majority');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;
var Todo = require('./app/models/todo');

var router = express.Router();

router.route('/todos')
    .post(function(req, res) {
        const { description, completed } = req.body;
        var todo = new Todo({description: description, completed: completed});

        todo.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Todo created!' });
        });
    })
    .get(function(req, res) {
        Todo.find(function(err, todos) {
            if (err) {
                res.send(err);
            }

            res.json(todos);
        })
    })

router.get('/', function(req, res) {
    res.json({ message: 'Welcome to our Todo List API!' });
});

app.use('/api', router);
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(port);
console.log('Magic happens on port ' + port);