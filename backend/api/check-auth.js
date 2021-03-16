const jwt = require('jsonwebtoken');
const secret = process.env.SECRET || 'foo';
const models = require('../models').models;
const refreshTokenSecret = 'yourrefreshtokensecrethere';

const authenticateJWT = function(req, res, next) {
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
        console.log("User not logged in")
        res.sendStatus(401);
    }
  } 

  const authenticateAdmin = function(req, res, next) {
    const authHeader = req.headers.authorization;
  
    if (authHeader) {
        const token = authHeader.split(' ')[1];
  
        jwt.verify(token, secret, (err, userid) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.userid = userid;
            console.log(userid)
            models.User.findOne({ where: {
                id: userid.id
            }})
            .then((user)=>{
                console.log(user.isAdmin)
                if (user.isAdmin){
                    return next();
                }else{
                    console.log("user not Admin")
                    res.sendStatus(401);
                    return
                }
            })
        });
    } else {
        console.log("User not logged in")
        res.sendStatus(401);
    }
  } 




 module.exports = {
    authenticateJWT: authenticateJWT,
    authenticateAdmin: authenticateAdmin
    }
