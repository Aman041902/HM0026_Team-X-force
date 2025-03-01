const express = require('express');
const contactrouter = express.Router();

const { contact } = require('../controller/contact')

contactrouter.post('/contact',contact);

module.exports = contactrouter;