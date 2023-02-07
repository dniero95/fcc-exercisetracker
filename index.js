const express = require('express')
const app = express()


const cors = require('cors')
require('dotenv').config()
// import env variables 

const port = process.env.PORT || 3000
const dbUsername = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD

// db connection
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const uri = `mongodb+srv://${dbUsername}:${dbPassword}@fcc-mongodb-and-mongoos.xl1syaw.mongodb.net/fcc-db-exercisetracker`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    app.listen(port)
    console.log(`Your app is listening on port ${port}\nGo to http://localhost:${port} to see the app`);
  })
  .catch(err => console.log(err));



// add body parser
const bodyParser = require('body-parser');
// bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cors middleware
app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


// import routes
const userRoutes = require('./routes/user');

app.use('/api', userRoutes);