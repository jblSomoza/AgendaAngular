'use strict'

var Contacto = require('../models/contacts');

/*Va a obtener todas los contactos sin ninguna condicion*/
function getContactos(req, res) {
    Contacto.find().populate('user').exec((err, contactos) => {
        if (err) return res.status(500).send({ message: 'Error en la solicitud' });

        if (!contactos) return res.status(404).send({ message: 'Error al listar los contactos' });

        return res.status(200).send({ contactos });
    })
}

function addContactos(req, res) {
    var contacto = new Contacto();
    var params = req.body;

    if (params.nombre && params.apellido && params.correo) {
        contacto.nombre = params.nombre;
        contacto.apellido = params.apellido;
        contacto.apodo = params.apodo;
        contacto.correo = params.correo;
        contacto.direccion = params.direccion;
        contacto.image = null;
        contacto.telefono = params.telefono;
        contacto.user = req.user.sub;

        contacto.save((err, contactoGuardado) => {
            if (err) return res.status(500).send({ message: 'Error en la peticion' });

            if (!contactoGuardado) return res.status(404).send({ message: 'Error al agregar el contacto' });

            return res.status(200).send({ contacto: contactoGuardado });
        })
    } else {
        res.status(200).send({
            message: 'Rellene los datos necesarios'
        })
    }
}

/*Va a obtener los contactos con una condicion*/
function getContacto(req, res) {
    var contactoId = req.params.id;

    Contacto.findById(contactoId, (err, contacto) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' });

        if (!contacto) return res.status(404).send({ message: 'Error al listar el contacto' });

        return res.status(200).send({ contacto });
    })
}

function deleteContacto(req, res) {
    var contactoId = req.params.id;
    // var contacto = new Contacto();

    Contacto.findById(contactoId, (err, contactoEncontrado)=>{
        if(err) return res.status(500).send({message: 'Error en la solicitud'});

        if(!contactoEncontrado) return res.status(404).send('error');

        for (let x = 0; x < contactoEncontrado.user.id.length; x++) {
            if(contactoEncontrado.user.id[x] === req.user.sub){
                return res.status(500).send({message: 'no puede eliminar otros contactos'});
            }else{
                Contacto.findByIdAndDelete(contactoId, (err, contactoEliminado)=>{
                    if(err) return res.status(500).send({message: 'Error en la peticion'});

                    if(!contactoEliminado) return res.status(404).send({message: 'Error'});

                    return res.status(200).send({message: 'Se elimino correctamente'});
                })
            }
        }
        
    })    
}

function editContacto(req, res) {
    var contactoId = req.params.id;
    var params = req.body;
    // var contacto = new Contacto();

    Contacto.findById(contactoId, (err, contactoEncontrado)=>{
        if(err) return res.status(500).send({message: 'Error en la solicitud'});

        if(!contactoEncontrado) return res.status(404).send('Error al editar el contacto');

        for (let x = 0; x < contactoEncontrado.user.id.length; x++) {
            if(contactoEncontrado.user.id[x] === req.user.sub){
                return res.status(500).send({message: 'no puede eliminar otros contactos'});
            }else{
                Contacto.findByIdAndUpdate(contactoId, params, (err, contactoEditado)=>{
                    if(err) return res.status(500).send({message: 'Error en la peticion'});

                    if(!contactoEditado) return res.status(404).send({message: 'Error'});

                    return res.status(200).send({contactoEditado});
                })
            }
        }
        
    })    
}

module.exports = {
    getContactos,
    addContactos,
    getContacto,
    deleteContacto,
    editContacto
}