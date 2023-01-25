const express = require('express')
const app = express()


const cors = require('cors')
require('dotenv').config()
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

app.post('/api/users', (req, res) =>{
  const username = req.body.username;
  const user = new User({
    username:username
  })
  res.json(user);
});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
