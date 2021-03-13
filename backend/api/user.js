const app = require('express').Router();
const models = require('../models').models;
const authenticateJWT = require('./check-auth');

module.exports = app;


/* CREATE user and CREATE empty order */
app.post('/register', (req, res, next)=> {
    //  assumes the user does not exist in db already
    models.User.create(req.body.userInfo)
    .then( user => {
        return models.Order.create({ status: 'pending', userId: user.id })
        .then( order => {
            console.log(order)
            let orderlines = ""
            if (req.body.cart.cartItems)
            {
                console.log(req.body.cart.cartItems)
                orderlines = req.body.cart.cartItems.map( line => {
                    console.log(line)
                    console.log( order.id)
                   return  models.OrderLine.create({
                        qty: line.qty,
                        productId: line.productId,
                        orderId: order.id
                     })
                })
            }

            console.log("'Orderlines after that'")
            console.log(orderlines)
            return Promise.all(orderlines)
        })
        .then( () => res.send(user))
    })
    .catch( err => {
        res.status(500).send(err)})
});
// create admin

// GET should get the users cart somehow....
app.get('/order/:status?',authenticateJWT, (req, res, next) => {
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


// get all completed orders from user
app.get('/:userId/orders', (req, res, next) => {
    models.Order.findAll({ where: {
            userId: req.params.userId,
            status: 'complete'
        },
        include: [
            {
                model: models.OrderLine,
                include: [ models.Product ]
            },
            {
                model: models.Address,
                as: 'billing'
            },
            {
                model: models.Address,
                as: 'shipping'
            }
        ]
    })
    .then( orders => {
        res.send(orders)
    })
    .catch(next)
});

//delete user
app.post('/:userId', (req, res, next) => {
    User.findById(req.params.userId).exec()
        .then(user => {
            if(!user){
                return res.status(404).json({
                    message: 'User not found'
                })
            } else {
                User.deleteOne({_id: req.params.userId}).exec()
                .then(result => {
                    res.status(200).json({
                        message: 'User deleted'
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                });
            }
});
});