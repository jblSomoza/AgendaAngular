'use strict'

var express = require('express');
var ContactoController = require('../controllers/contactController');
var md_auth = require('../middlewares/autheticated');

var api = express.Router();

api.get('/contactos', md_auth.ensureAuth, ContactoController.getContactos);
api.post('/agregar-contacto', md_auth.ensureAuth, ContactoController.addContactos);
api.delete('/eliminar-contacto/:id', md_auth.ensureAuth, ContactoController.deleteContacto);
api.put('/actualizar-contacto/:id', md_auth.ensureAuth, ContactoController.editContacto);

module.exports = api;