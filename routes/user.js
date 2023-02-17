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

router.get('/users', (req, res) => {
  User.find({}, { _id: 1, username: 1 })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

router.post('/users/:_id/exercises', (req, res) => {
  const id = req.params._id;
  const description = req.body.description;

  const duration = +req.body.duration;
  let date = (!isNaN(Date.parse(req.body.date))) ? new Date(req.body.date) : new Date();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  // date = `${days[date.getUTCDay()]} ${months[date.getUTCMonth()]} ${(date.getUTCMonth() + 1).toString().length > 9 ? (date.getUTCMonth() + 1) : "0" + (date.getUTCMonth() + 1).toString()} ${date.getUTCFullYear()}`
  date = date.toDateString('en-US')
  const exercise = { description: description, duration: duration, date: date };

  User.findByIdAndUpdate(id, {
    $push: { exercises: exercise }
  }, (err, user) => {
    if (err) return handleError(err);


    res.json({
      username: user.username,
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date,
      _id: user._id
    });
  });
});


router.get('/users/:_id/logs', (req, res) => {
  const id = req.params._id;

  const from = new Date(req.query.from);

  const to = new Date(req.query.to);
  const limit = Number(req.query.limit);
  User.findById(id)
    .then(user => {

      let log = user.exercises
      console.log(from);
      if (!(isNaN(from)))
        log = log.filter((exercise) => {
          let exerciseDate = new Date(exercise.date);
          return (exerciseDate.getTime() >= from.getTime());
        });
      console.log(log);
      if (!(isNaN(to)))
        log = log.filter((exercise) => {
          let exerciseDate = new Date(exercise.date);
          return (exerciseDate.getTime() <= to.getTime());
        });
      if (!(isNaN(to)))
        log = log.slice(0, limit);

      console.log(log);

      res.json({
        _id: user._id,
        username: user.username,
        count: log.length,
        log: log
      });
    })
    .catch(err => {
      console.log(err);
    });
});
module.exports = router;

