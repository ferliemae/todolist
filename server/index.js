var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
const path     = require('path');
var port       = process.env.PORT || 8080;

mongoose.connect('mongodb+srv://ferlie_db:rfVR6HTWwYZ4uq3N@cluster0.m0vzp.mongodb.net/todolist?retryWrites=true&w=majority');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', require('./routes'));
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(port);