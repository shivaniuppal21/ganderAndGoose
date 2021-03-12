const app = require('express').Router();
const models = require('../models').models;
const user = require('../models').user

app.post('/createadmin', async (req, res) => {
    const uid = uuidv4();
    const firstName = 'Ricky'
    const email= 'admin@example.com'
    const password= 'admin'
}