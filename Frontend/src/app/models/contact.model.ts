export class Contacto{
    constructor(
        public _id: String,
        public user: String,
        public contacto:{
            nombres: String,
            apellidos: String,
            apodo: String,
            correo: String,
            direccion: String,
            image: String,
            telefono: String
        }
    ){}
}