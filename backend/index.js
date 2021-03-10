  
const fs = require("fs");
const path = require("path");
const express = require('express')
const app = express()
const port = 3080
const db = require("./db");
const helpers = require('./helpers/helper');
const { v4: uuidv4 } = require('uuid');

const bcrypt = require('bcrypt');
var bodyParser    = require('body-parser');
app.use(bodyParser.json());


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
    const uid = uuidv4();
    const incomingEmail = req.body.email;
    const incomingPassword = req.body.password;
    const confirmPassword = req.body.confirmpassword;
    const firstName = req.body.firstName;
    const LastName = req.body.LastName;
    const mobile = req.body.mobile;
    const country = req.body.country;
    const zipCode = req.body.zipCode;
    const query = `INSERT INTO Users (ID,email, first_name, last_name,password,mobile,zipCode,country)
    VALUES ('${uid}','${incomingEmail}','${firstName}','${LastName}','${incomingPassword}','${mobile}','${zipCode}','${country}')`;
    
    // We should check if email exists
    helpers.emailExists(db,incomingEmail).then((emailExist) => {
      if (emailExist){
        res.send('Not saved User already exist')
      }
      else{
        db.query(query, (err, resp) => {
          if (err) {
              console.error(err);
          }
          console.log('Data insert successful');
          res.send('saved to DB');
         })
      }
      
      
    })
  })

 /* Login route*/   

    app.get('/signIn', (req, res) => {
      res.render('signIn');
    });
    
    app.post('/signin', (req, res) => {
    const incomingEmail = req.body.email;
    const incomingPassword = req.body.password;

    if (!incomingEmail || !incomingPassword) {
      res.statusCode = 400;
      res.send('Incorrect username or password');
      res.redirect('signIn')
    }
    // Authenticate user
    // How?
    // 1. Use incoming email to get data from DB
    // 2. Use db password to match with incoming password
    else {
      helpers.fetchPassword(db,incomingEmail).then((password) => {
        if (password){
          if(password.trim() === incomingPassword.trim()){
            res.send('Login Success')
          }
          
        }
        else{
          console.log('mismatch password');
          res.send('can not login mismatch password');
        }
      })
      //res.render('/products')

    }
    
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