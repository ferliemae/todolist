var express = require('express');
var router  = express.Router();
var Todo    = require('./app/models/todo');

router.route('/')
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

router.route('/:todo_id')
  .get((req, res) => {
      Todo.findById(req.params.todo_id, (err, todo) => {
          if (err)
            res.send(err);
          res.json(todo);
      })
  })
  .put((req, res) => {
      Todo.findById(req.params.todo_id, (err, todo) => {
          if (err)
            res.send(err);
          console.log(req.body)
          todo.description = req.body.description;
          todo.completed = req.body.completed;

          todo.save(err => {
              if (err)
                res.send(err);

              res.json({message: 'Todo updated!'});
          })
      })
  })

module.exports = router;