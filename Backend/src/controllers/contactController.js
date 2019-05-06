'use strict'

var User = require('../models/user');
var Contact = require('../models/contacts')

function addContact(req, res) {

    var contact = new Contact();
    var params = req.body;
    var userID = req.user.sub

    User.findById(userID, (err, userFound) => {
        if (err) return res.status(500).send({ message: 'Error al buscar el usuario' });
        if (!userFound) return res.status(404).send({ message: 'No se ha podido encontrar el usuario al que quieres agregarle un contacto' })

        if (params.nombres && params.telefono) {
            contact.user = userID;
            contact.contacto.nombres = params.nombres;
            contact.contacto.apellidos = params.apellidos;
            contact.contacto.apodo = params.apodo;
            contact.contacto.correo = params.correo;
            contact.contacto.direccion = params.direccion
            contact.contacto.image = null;
            contact.contacto.telefono = params.telefono;
            contact.save();
            return res.status(200).send({ message: 'Contacto añadido exitosamente' })
        }

    })
}

function updateContact(req, res) {
    var userID = req.user.sub;
    var contactID = req.params.id
    var params = req.body;

    Contact.findById(contactID, (err, ok) => {

        if (err) return res.status(500).send({ message: 'Error en la peticion' });
        if (!ok) return res.status(404).send({ message: 'No se ha encontrado el contacto a actualizar' })
        if (ok.user == userID) {

            Contact.findOneAndUpdate(contactID, params, { new: true }, (err, contactUpdated) => {
                if (err) return res.status(500).send({ message: 'Error en la peticion' });
                if (!contactUpdated) return res.status(404).send({ message: 'Error al buscar usuario' })

                return res.status(200).send({ contact: contactUpdated })


            })
        } else {
            return res.status(200).send({ message: 'No puedes actualizar los contactos de otro usuario' })
        }
    })
}

function deleteContact(req, res) {
    var idContact = req.params.id;
    var userId = req.user.sub; 

    Contact.findById(idContact, (err, contactFound) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' });
        if (!contactFound) return res.status(404).send({ message: 'No se ha encontrado el contacto a eliminar' });

        if (contactFound.user == userId) {
            Contact.findByIdAndDelete(idContact, (err, deleted) => {
                if (err) return res.status(500).send({ message: 'Error en la peticion' });
                if (!deleted) return res.status(404).send({ message: 'No se ha encontrado el contacto a eliminar' });

                return res.status(200).send({ message: 'Se ha eliminado el contacto' })
            })
        } else {
            return res.status(200).send({ message: 'No puedes eliminar los contactos de otro usuario' })
        }
    })
}

function getContactsUser(req, res) {
    var idContacts = req.user.sub;

    Contact.find({ user: idContacts }, (err, contactsFound) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' });
        if (!contactsFound) return res.status(404).send({ message: 'No tienes contactos' });

        return res.status(200).send({ contactsFound })

    })
}

module.exports = {
    addContact,
    updateContact,
    deleteContact,
    getContactsUser
}