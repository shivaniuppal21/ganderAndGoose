const jwt = require('jsonwebtoken');
const secret = process.env.SECRET || 'foo';
const refreshTokenSecret = 'yourrefreshtokensecrethere';

module.exports =  (req, res, next) => {
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