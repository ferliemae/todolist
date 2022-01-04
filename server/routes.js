var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
  res.json({ message: 'Welcome to our Todo List API!' });
});
router.use('/todos', require('./todo'));

module.exports = router;