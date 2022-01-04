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

module.exports = router;