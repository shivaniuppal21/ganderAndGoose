  
const fs = require("fs");
const path = require("path");
const express = require('express')
const app = express()
const port = 3080
const db = require("./db");
const helpers = require('./helpers/helper');
const { v4: uuidv4 } = require('uuid');
const cookieSession = require('cookie-session');

const bcrypt = require('bcrypt');
var bodyParser    = require('body-parser');
app.use(bodyParser.json());
app.use(
  cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
  }),
);


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
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const mobile = req.body.mobile;
    const country = req.body.country;
    const zipCode = req.body.zipCode;
    const query = `INSERT INTO Users (ID,email, first_name, last_name,password,mobile,zipCode,country,isAdmin)
    VALUES ('${uid}','${incomingEmail}','${first_name}','${last_name}','${incomingPassword}','${mobile}','${zipCode}','${country}',false)`;
    
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



  /* edit User */

  app.post('/edituser', (req, res) => {
    console.log(req.body)
    const loggedUser = req.session['user'] 
    /*{
      username: user.first_name,
      email: user.email,
      admin: user.isAdmin,
      cart: null
    };*/
    const update_user_items= {}
    if (loggedUser && loggedUser.email)
    { 
      if (req.body.password){
        update_user_items['password'] =req.body.password
      }
      if (req.body.first_name){
        update_user_items['first_name'] =req.body.first_name
      }
      if (req.body.last_name){
        update_user_items['last_name'] =req.body.last_name
      }
      if (req.body.mobile){
        update_user_items['mobile'] =req.body.mobile
      }
      const args = Object.values(update_user_items);
    const keys = Object.keys(update_user_items).join(',');
    const argKeys = Object.keys(update_user_items).map((obj,index) => { 
      return "$"+(index+1) 
    }).join(',');  
    args.push(loggedUser.email)
    const query = "UPDATE Users SET ("+keys+") = ("+argKeys+") WHERE email = $"+(args.length);

      db.query(query, args, (error, result, fields) => {
        if(error) throw error;
        res.send('User UPDATED')
    });
    }
    else{
      res.send('User not logged in')
    }

  })







  app.post('/createadmin', async (req, res) => {
    const uid = uuidv4();
    const firstName = 'Ricky'
    const email= 'admin@example.com'
    const password= 'admin'
      
      const query = `INSERT INTO Users (ID,email, first_name,last_name,password,isAdmin)
      VALUES ('${uid}','${email}','${first_name}','${first_name}','${password}',true)`;
      
      // We should check if email exists
      helpers.emailExists(db,email).then((emailExist) => {
        if (emailExist){
          res.send('Not saved Admin already exist')
        }
        else{
          db.query(query, (err, resp) => {
            if (err) {
                console.error(err);
            }
            console.log('Admin Data insert successful');
            res.send('Admin saved to DB');
           })
        }
      })
  });
  
 /* Login route*/   

    app.get('/login', (req, res) => {
      res.render('login');
    });
    
    app.post('/login', (req, res) => {
    const incomingEmail = req.body.email;
    const incomingPassword = req.body.password;

    if (!incomingEmail || !incomingPassword) {
      res.statusCode = 400;
      res.send('Incorrect username or password');
      res.redirect('login')
    }
    // Authenticate user
    // How?
    // 1. Use incoming email to get data from DB
    // 2. Use db password to match with incoming password
    else {
      helpers.fetchPassword(db,incomingEmail).then((password) => {
        if (password){
          if(password.trim() === incomingPassword.trim()){
            helpers.fetchUser(db,incomingEmail).then((user) => {
              if (user)
              {
                req.session['user'] =// user.ID
                {
                  username: user.first_name,
                  email: user.email,
                  admin: user.isAdmin,
                  cart: null
                };
                res.send('Login Success')
              }
            })

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
 app.post('/logout', (req, res) => {
   console.log(req.session['user'])
      req.session['user'] = null;
      console.log(req.session['user'])
      res.send("logged out")
      //res.redirect('/signin')
    });

/* Add Product */

app.post('/product', (req, res) => {
  console.log(req.body)
  const uid = uuidv4();
  const title = req.body.title;
  const description = req.body.description;
  const created_on = Date.now()
  const price = req.body.price;
  const reviews = req.body.reviews;
  const category = req.body.category;

  const query = `INSERT INTO Products (product_id,title,description,created_on,price,reviews,category)
  VALUES ('${uid}','${title}','${description}','${created_on}','${price}','${reviews}','${category}')`;
  
  // We should check if email exists
      db.query(query, (err, resp) => {
        if (err) {
            console.error(err);
        }
        console.log('Product insert successful');
        res.send('saved to DB');
       })
})





    /* Get Product*/


    app.get('/product', (req, res) => {
      console.log(req.body)
      const uid = uuidv4();
      const incomingEmail = req.body.email;
      const incomingPassword = req.body.password;
      const confirmPassword = req.body.confirmpassword;
      const first_name = req.body.first_name;
      const last_name = req.body.last_name;
      const mobile = req.body.mobile;
      const country = req.body.country;
      const zipCode = req.body.zipCode;
      const query = `INSERT INTO Users (ID,email, first_name, last_name,password,mobile,zipCode,country,isAdmin)
      VALUES ('${uid}','${incomingEmail}','${first_name}','${last_name}','${incomingPassword}','${mobile}','${zipCode}','${country}',false)`;
      
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