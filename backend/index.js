  
const fs = require("fs");
const path = require("path");
const express = require('express')
const app = express()
const port = 3080
const db = require("./db");

const bcrypt = require('bcrypt');
var bodyParser    = require('body-parser');
app.use(bodyParser.json());
const pgp = require('pg-promise')(/* initialization options */);


function read(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(
      file,
      {
        encoding: "utf-8"
      },
      (error, data) => {
        if (error) return reject(error);
        resolve(data);
      }
    );
  });
}


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})





app.get('/', (req, res) => {
    res.send('An alligator approaches!');
});
// will show a form to login
app.get('/register', (req, res) => {
    //const user_Id = req.session['user_Id'];
    //const templateVars = {user: users[user_Id]};
    res.redirect('http://localhost:3000');
  });
  
  /*
  Sample query
curl --location --request POST 'http://localhost:3080/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"sdsdsd" ,
"password":"sdsdsd" ,
"confirmpassword":"sdsdsd" ,
"firstName":"sddewqe" ,
"LastName":"rfdf" ,
 "mobile":"5656565565" ,
"country":"ca" ,
"zipCode":"3434"
}'
  */
  app.post('/register', (req, res) => {
    console.log(req.body)
    const incomingEmail = req.body.email;
    const incomingPassword = req.body.password;
    const confirmPassword = req.body.confirmpassword;
    const firstName = req.body.firstName;
    const LastName = req.body.LastName;
    const mobile = req.body.mobile;
    const country = req.body.country;
    const zipCode = req.body.zipCode;
    const query = `INSERT INTO Users (email, first_name, last_name,password,mobile,zipCode,country)
    VALUES ('${incomingEmail}','${firstName}','${LastName}','${incomingPassword}','${mobile}','${zipCode}','${country}')`;
    db.query(query, (err, res) => {
      if (err) {
          console.error(err);
          return;
      }
      console.log('Data insert successful');
  });

    console.log(incomingEmail)
    console.log(incomingPassword)
    res.send('saved to DB');
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


  
app.get("/api/reset", (request, response) => {
  Promise.all([
    read(path.resolve(__dirname, `db/schema/seed_tofix.sql`))
  ])
  .then(([seed]) => {
    console.log(seed)
  db.query(seed)
    .then(() => {
      console.log("Database Reset");
      response.status(200).send("Database Reset");
    });
})
.catch(error => {
  console.log(`Error setting up the reset route: ${error}`);
});
});