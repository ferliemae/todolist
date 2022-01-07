var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TodoSchema   = new Schema({
  description: String,
  completed: Boolean,
  priority: Number,
});

module.exports = mongoose.model('Todo', TodoSchema);