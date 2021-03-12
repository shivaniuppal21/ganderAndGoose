const app = require('express').Router();
const models = require('../models').models;
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET || 'foo';
const refreshTokenSecret = 'yourrefreshtokensecrethere';
let refreshTokens = [];

module.exports = app;

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, secret, (err, userid) => {
          if (err) {
              return res.sendStatus(403);
          }
          req.userid = userid;
          next();
      });
  } else {
      res.sendStatus(401);
  }
}

//  request handler that generated new tokens based on the refresh tokens:
app.post('/token', (req, res) => {
  const { token } = req.body;
  if (!token) {
      return res.sendStatus(401);
  }

  if (!refreshTokens.includes(token)) {
      return res.sendStatus(403);
  }

  jwt.verify(token, refreshTokenSecret, (err, user) => {
      if (err) {
          return res.sendStatus(403);
      }

  const accessToken = jwt.sign({ username: user.username, role: user.role }, secret, { expiresIn: '10m' });

    res.json({
          accessToken
      });
  });
});


// user login
app.post('/login', (req, res, next)=> {
  models.User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password
    }
  })
  .then( user => {
    if(user){
      const token = jwt.sign({id: user.id}, secret,{ expiresIn: '10m' });
      const refreshToken = jwt.sign({id: user.id}, refreshTokenSecret);
      refreshTokens.push(refreshToken);
      //const token = jwt.encode({id: user.id,"iat": 1516234022,"exp":1517999022}, secret);
      return res.send({ token , refreshToken});
    }
    return res.sendStatus(401);
  })
  .catch(next);
});

app.post('/logout', (req, res) => {
  console.log(req.body)
  const token = req.body.token;
  console.log(token)
  console.log(refreshTokens)
  function checktoken(tok) {
    console.log(token)
    console.log(tok)
    return tok !== token;
}
  refreshTokens = refreshTokens.filter(checktoken,token)

  res.send("Logout successful");
});


// GET should get the users cart somehow....
app.get('/orders/:status?',authenticateJWT, (req, res, next) => {
    try{
      let ordercondition = {}
      ordercondition.userId = req.userid.id
      if (req.params.status){
        ordercondition.status = req.params.status
      }
        //const token = jwt.decode(req.params.token, secret);
        models.User.findOne({
          where: { id: req.userid.id },
          include: [{
            model: models.Order,
            where: ordercondition
          }]
        })
        .then( user => {
            if(!user) {
                return res.sendStatus(401)
            }
            res.send(user)
        })
    }
    catch(err) {
      console.log(err)
        res.sendStatus(500)
    }
});