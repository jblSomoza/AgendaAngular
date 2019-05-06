'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactSchema = Schema({
    user: { type: Schema.ObjectId, ref: 'User' },
    contacto: {
        nombres: String,
        apellidos: String,
        apodo: String,
        correo: String,
        direccion: String,
        image: String,
        telefono: String
    }
});

module.exports = mongoose.model('Contact', ContactSchema);