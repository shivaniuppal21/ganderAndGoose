const app = require('express').Router();
const models = require('../models').models;
const authenticate = require('./check-auth');

module.exports = app;

app.post('/register', (req, res, next)=> {
    //  assumes the user does not exist in db already
    models.User.create(req.body.userInfo)
    .then( (user) => res.send(user))
    .catch( err => {
        res.status(500).send(err)})
});


/* CREATE user and CREATE empty order - registerwith cart */
app.post('/registerwithcart', (req, res, next)=> {
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


// GET should get the users cart somehow....
app.get('/order/:status?',authenticate.authenticateJWT, (req, res, next) => {
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
            where: ordercondition,
            include:[
            {
                model: models.OrderLine,
                include: [{ model: models.Product }]
            }
            ,
            {
                model: models.Address,
                as: 'shipping'
            },
            {
                model: models.Address,
                as: 'billing'
            }
        ]}
        ]
        })
        .then( user => {
            if(!user) {
                return res.status(200).send("No "+ req.params.status + " orders found")
            }
            res.send(user)
        })
        .catch((err)=>{
            return res.sendStatus(500)
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

// addcart and orders if the user already exists (verified by authenticateJWT)
// add new order if no order is provided otherwise update the existing order with orderlines(cartitems)
app.post('/addtocart/:orderId?', authenticate.authenticateJWT,(req, res, next) => {
    console.log(req.body)
    if (!req.body || !req.body.cart || !req.body.cart.cartItems)
    {
        console.log("Cart Empty")
        return res.send("Cart empty")
    }
// if no orderID in params, create new order
new Promise((resolve,reject) =>
{   let orderId;
    if(!req.params.orderId){
        console.log(req.userid.id)
        return models.Order.create({ status:'pending', userId: req.userid.id })
        .then(order =>{
            console.log(order.id)
            orderId = order.id
            return resolve(orderId)
        })
        .catch(err =>{
            console.log(err)
        })
    }else {
        orderId = req.params.orderId 
    }
     return resolve(orderId)
}).then((orderId) => {
    console.log(req.body.cart.cartItems)

    let orderlines = req.body.cart.cartItems.map( line => {
        console.log(line)
        console.log( orderId)
    // if productId already exists in orderline then update method to be used
       return  models.OrderLine.create({
            qty: line.qty,
            productId: line.productId,
            orderId: orderId
         })
    })
    return Promise.all(orderlines)
})
.then( () => res.send(orderlines))
.catch( err => {
    res.status(500).send(err)})
});


//delete user
app.delete('/:userId', (req, res, next) => {
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