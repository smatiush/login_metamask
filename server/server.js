const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/authenticated', function(req, res) {
  res.redirect('/authenticated.html');;
});

app.post('/login', (req, res) => {
  const signature = req.body;
  if (signature) {
    req.session.isLoggedIn = true;
    res.redirect('/authenticated');
  } else {
    res.render('login', {error: 'Username or password is incorrect'});
  }
});
