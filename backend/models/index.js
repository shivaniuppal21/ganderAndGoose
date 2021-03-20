const conn = require('./db');
const Product = require('./Product');
const User = require('./User');
const Order = require('./Order');
const OrderLine = require('./OrderLine');
const Address = require('./Address');
let products = require('./products.json');
const ProductImage = require('./ProductImage');
const fs = require("fs");

ProductImage.belongsTo(Product) // created product  id
Product.hasMany(ProductImage);


Order.belongsTo(User); // creates userId
User.hasMany(Order);

OrderLine.belongsTo(Order); // creates orderId
OrderLine.belongsTo(Product); // creates productId
Order.hasMany(OrderLine); // allow me to include on findAll
Product.hasMany(OrderLine);

Order.belongsTo(Address, { as: 'shipping' });
Order.belongsTo(Address, { as: 'billing' });
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

/**
* Returns a random integer between min (inclusive) and max (inclusive).
* The value is no lower than min (or the next integer greater than min
* if min isn't an integer) and no greater than max (or the next integer
* lower than max if max isn't an integer).
* Using Math.round() will give you a non-uniform distribution!
*/
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const sync = () => conn.sync({ force: true });

const seed = () => {

  const users = [
    { firstName: 'Mauro', lastName: 'Restuccia', email: 'mrestuccia@mac.com', password: 'mcat' },
    { firstName: 'Harish', lastName: 'tadikona', email: 'harish11.tadikonda@gmail.com', password: 'harish29' },
    { firstName: 'Kris', lastName: 'Alnes', email: 'kris.alnes@gmail.com', password: 'kdog' },
    { firstName: 'admin', lastName: 'admin', email: 'admin@gmail.com', password: 'admin',isAdmin:true }];
    const useUploadFile = {fieldname: 'file',
                            encoding: '7bit',
                            mimetype: 'image/png'}
    const uploadFile = ['MainPhoto_Gray9.5.png',
                        'BirthInfo_Raisedlettering_gray7.5.png',
                         'DarkBrown5.5ColourSample.png',
                       'Brown9.5WVieraColourSample.png',
                       'FullShotGray9.5Raisedlettering.png',
                        'Gray7.5HallieColourSample.png',
                        'NaturalwithDarkBrownPersonalization9.5Wcoloursample.png',
                        'GanderandgooseCloudCoatRack.jpg',
                        'Hand-Crafted Wooden Name Sign.jpg',
                        'PersonalisedCoatHook.jpg',
                        'personalisednameplanque.jpg',
                        'personalisednameplanquecritterstheme.jpg',
                        'RainbowCoatHookWithClouds.jpg',
                        'PersonalizedWoodenOrnament.jpg'
                      ]

    const category = [
      { name: 'Mauro', description: 'Restuccia12'},
      { name: 'Mauro', description: 'Restuccia343' }
    ]
  const shippingAddress = { addressLine1: '123 Green ave', addressLine2: 'apt 4', city: 'Brooklyn', state: 'NY', zip: '11211', country: 'USA' };
  const billingAddress = { addressLine1: '60 Berry Street', addressLine2: 'apt 4D', city: 'Brooklyn', state: 'NY', zip: '11211', country: 'USA' };

  return sync()
    .then(() => {
      const productPromises = products.map((product) => {
        Product.create( product) 
      })
      const ProductImagePromise = new Promise ( () => {
        for (let file of uploadFile){
          console.log(file)
          ProductImage.create({
            type: useUploadFile.mimetype,
            name: file,
            data: fs.readFileSync(
              __basedir + "/resources/static/assets/seed/" + file
            ),
          }).then((image) => {
            fs.writeFileSync(
              __basedir + "/resources/static/assets/tmp/" + image.name,
              image.data
            );
            fs.writeFileSync(
              __basedir + "/resources/static/assets/uploads/" + image.name,
              image.data
            );
          });
        }
      })
       
      const userPromises = users.map(user => User.create(user));
      const shippingTest = Address.create(shippingAddress, { as: 'shipping' })
      const billingTest = Address.create(billingAddress, { as: 'billing' })
      return Promise.all([productPromises, ProductImagePromise, userPromises, shippingTest, billingTest])
    })
    .then(() => {
      const orderOne = Order.create({ userId: 3, status: 'pending', shippingId: 1, billingId: 2
 });
      const orderTwo = Order.create({ userId: 1, status: 'pending' });
      const orderThree = Order.create({ userId: 3, status: 'complete', shippingId: 1, billingId: 2, confirmationId: 'ch_1AG9jlG9HL9FNXzQRYZ9KpdZ' });
      const orderFour = Order.create({ userId: 3, status: 'complete', shippingId: 1, billingId: 2, confirmationId: 'ch_1AG9jlG9HL9FNXzQRYZ9KpdZ' });
      return Promise.all([orderOne, orderTwo, orderThree, orderFour])
    })
    .then( ([orderOne, orderTwo, orderThree, orderFour]) => {
      const orderLineOne = OrderLine.create({ qty: 3, productId: 3, orderId: orderOne.id });
      const orderLineTwo = OrderLine.create({ qty: 2, productId: 1, orderId: orderOne.id });
      const orderLineThree = OrderLine.create({ qty: 3, productId: 2, orderId: orderThree.id });
      const orderLineFour = OrderLine.create({ qty: 1, productId: 3, orderId: orderFour.id });
      const orderLineFive = OrderLine.create({ qty: 2, productId: 2, orderId: orderFour.id });

      return Promise.all([orderLineOne, orderLineTwo, orderThree, orderLineFour, orderLineFive])
    })
    .catch(err => console.log(err))
};

module.exports = {
  models: {
    Product,
    User,
    Order,
    OrderLine,
    Address,
    ProductImage,
    },
  sync,
  seed
};