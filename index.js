const express = require('express')
const app = express()
const port = 3000
const bcrypt = require('bcrypt');
var bodyParser    = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
const pgp = require('pg-promise')(/* initialization options */);

const cn = {
    host: 'localhost', // server name or IP address;
    port: 5432,
    database: 'gandergoose',
    user: 'postgres',
    password: 'postgres'
};
const db = pgp(cn); // database instance;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/', (req, res) => {
    res.send('An alligator approaches!');
});
// will show a form to login
app.get('/register', (req, res) => {
    const user_Id = req.session['user_Id'];
    const templateVars = {user: users[user_Id]};
    res.render('register', templateVars);
  });
  
  app.post('/register', (req, res) => {
    console.log(req.body)
    const incomingEmail = req.body.email;
    const incomingPassword = req.body.password;
    console.log(incomingEmail)
    console.log(incomingPassword)
    res.send('An alligator approaches!');
    /*
    const userid = generateRandomString();
  
    if (!incomingEmail || !incomingPassword) {
      res.statusCode = 400;
      res.send('Incorrect username or password');
      return;
    }
    // We should check if email exists
    if (emailExists(users, incomingEmail)) {
      res.send('An account already exists for this email address');
      return;
    } else {
      // If not, we want to add the new user data to the database
      const newUser = {
        id: userid,
        email: incomingEmail,
        password: bcrypt.hashSync(incomingPassword, 10),
      };
      users[userid] = newUser;
      res.redirect('/urls');
    }
    */
  });