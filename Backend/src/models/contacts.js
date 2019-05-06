'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactsSchema = Schema({
    nombre: String,
    apellido: String,
    apodo: String,
    correo: String,
    direccion: String,
    image: String,
    telefono: String,
    user: { type: Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Contacts', ContactsSchema);