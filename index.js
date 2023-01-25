const express = require('express')
const app = express()


const cors = require('cors')
require('dotenv').config()

// db connection
const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/fcc-exercisetracker';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    app.listen(3000)
    console.log('Your app is listening on port 3000');
  })
  .catch(err => console.log(err));



// models import
const User = require('./models/user');

// add body parser
const bodyParser = require('body-parser');
// bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post('/api/users', (req, res) => {
  const username = req.body.username;
  const user = new User({
    username: username
  })

  user.save()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });

  res.json(user);
});

app.get('/api/users', (req, res) => {
  User.find()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
})

// COMMENT TO TEST DB CONNECTION
// const listener = app.listen(process.env.PORT || 3000, () => {
//   console.log('Your app is listening on port ' + listener.address().port)
// })
