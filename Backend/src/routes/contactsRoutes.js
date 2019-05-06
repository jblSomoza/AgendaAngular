'use strict'

var express = require('express');
var ContactoController = require('../controllers/contactController');
var md_auth = require('../middlewares/autheticated');

var api = express.Router();

//Rutas Contactos
api.post('/contacto', md_auth.ensureAuth, ContactoController.addContact);
api.put('/contacto/:id', md_auth.ensureAuth, ContactoController.updateContact);
api.delete('/contacto/:id', md_auth.ensureAuth, ContactoController.deleteContact);
api.get('/contactos', md_auth.ensureAuth, ContactoController.getContactsUser)

module.exports = api;