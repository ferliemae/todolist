var express = require('express');
var router  = express.Router();
var Todo    = require('./app/models/todo');

router.route('/')
  .post(function(req, res) {
    const { description, completed, priority } = req.body;
    var todo = new Todo({description: description, completed: completed, priority: priority});

    todo.save(function(err, todo) {
      if (err) res.send(err);

      res.json(todo);
    });
  })
  .get(function(req, res) {
    Todo.find(function(err, todos) {
      if (err) res.send(err);

      res.json(todos);
    })
  })

router.route('/:todo_id')
  .get((req, res) => {
      Todo.findById(req.params.todo_id, (err, todo) => {
          if (err) res.send(err);

          res.json(todo);
      })
  })
  .put((req, res) => {
      Todo.findById(req.params.todo_id, (err, todo) => {
          if (err) res.send(err);

          todo.description = req.body.description;
          todo.completed = req.body.completed;
          todo.priority = req.body.priority;

          todo.save((err, saved) => {
              if (err) res.send(err);

              console.log(saved)
              res.json({message: 'Todo updated!'});
          })
      })
  })
  .delete((req, res) => {
     const { todo_id } = req.params;
    Todo.remove({_id: todo_id}, (err, todo) => {
      if (err) res.send(err)

      res.json({id: todo_id})
    })
  })

module.exports = router;