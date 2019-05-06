import { Injectable } from '@angular/core';
//Lista Observable en donde almaceno la URL
import { Observable } from 'rxjs'
//Sirven para manejar los metodos http y enlazarlos con el BACKEND
import { HttpClient, HttpHeaders } from '@angular/common/http'
//Contiene la ruta para acceder al backend
import { GLOBAL } from './global.service'
import { User } from '../models/user.model'


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: String;
  public identity;//Contiene la informacion del usuario
  public token;

   //Modulo que trabaja con las consultas HTTP de Angular _http
  constructor(public _http : HttpClient) {
        //Igualamos la variable URL a Global.url la cual contiene la direccion de nuestro Backend

      this.url = GLOBAL.url
   }

   getUsers(): Observable<any> {
     let headers =  new HttpHeaders().set('Content-Type', 'application/json')
      //Mandamos a traer a los usuarios por medio de la ruta en el Backend
     //Ejecutamos la funcion
     return this._http.get(this.url + 'usuarios', { headers: headers })
   }

   registro(user : User) : Observable<any>{ //lista
    //Convertimos a JSON los parametros para poder introducirlos
     //Ejecutamos la funcion
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    //Mandamos a llamar la funcion registrar por medio de la ruta del Backend
    //Ejecutamos la funcion
    return this._http.post(this.url + 'registrar', params, {headers : headers});
  }

   login(user, gettoken= null): Observable<any> {
     if(gettoken != null) {
       user.gettoken = gettoken
     }
     let params = JSON.stringify(user);
     let headers = new HttpHeaders().set('Content-Type', 'application/json');
      //Utilizamos la ruta del backend almacenada en el servicio GLOBAL, luego mandamos la ruta /login 
    return this._http.post(this.url+'login',params,{headers:headers})
   }

   getIdentity(){
    //Convertimos los parametros a formato JSON , traemos del Cache los datos del usuario
    var identity1 = JSON.parse(sessionStorage.getItem('identity'))
    if(identity1 != 'undefined'){
      this.identity = identity1;
    }else{
      this.identity = null;
    }
    return this.identity;
  }

  getToken(){
    var token2 = sessionStorage.getItem('token')
    if(token2 != 'undefined'){
      this.token = token2;
    }else{
      this.token = null;
    }
    return this.token;
  }

    updateUser(user: User,): Observable<any>{
    //Convierte un valor a JSON String
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());

    //Va entre llaves porque es un JSON
    return this._http.put(this.url+'editar-usuario/'+user._id,params,{headers:headers})
  }


   
}
