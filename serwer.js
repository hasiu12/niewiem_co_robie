const express = require('express');
const app = express();
const passport = require('./models/auth'); // import from auth.js
const { User } = require('./models/index'); // import from index.js

app.use(passport.initialize());
app.use(passport.session());

// Tutaj dodaj swoje pozostałe ścieżki i middleware

// Możesz używać zaimportowanego `User` do wykonania operacji na modelu, na przykład:
app.get('/api/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.listen(4000, () => console.log('Server started on port 4000'));