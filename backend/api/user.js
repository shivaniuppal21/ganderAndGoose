const app = require('express').Router();
const models = require('../models').models;

module.exports = app;


/* CREATE user and CREATE empty order */
app.post('/register', (req, res, next)=> {
    //  assumes the user does not exist in db already
    models.User.create(req.body.userInfo)
    .then( user => {
        return models.Order.create({ status: 'pending', userId: user.id })
        /*.then( order => {
            console.log(order)
            let orderlines = ""
            if (req.body.cart.cartItems)
            {
                console.log(req.body.cart.cartItems)
                orderlines = req.body.cart.cartItems.map( line => {
                    return models.OrderLine.create({
                        qty: line.qty,
                        productId: line.productId,
                        orderId: order.id })
                })
            }

            console.log("'Orderlines after that'")
            console.log(orderlines)
            return resolve()
        })*/
        .then( () => res.send(user))
    })
    .catch( err => {
        console.log("i am siutting in error")
        res.status(500).send(err)})
});
// create admin


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