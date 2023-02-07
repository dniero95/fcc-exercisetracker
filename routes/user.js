const express = require('express');

const router = express.Router();

const User = require('../models/user');

router.post('/users', (req, res) => {
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
  
 

module.exports = router;

