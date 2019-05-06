import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { Contacto } from './../models/contact.model';

@Injectable()
export class ContactoService{
    public url: string;
    public identity;
    public token;
    public headers;

    constructor(public _http: HttpClient){
        this.url = GLOBAL.url
    }

    getContactos(token): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token)//le asigno la cabecera de la peticion, asigno el token del usuario
        return this._http.get(this.url+'contactos', {headers:headers}) 
    }

    addContactos(contacto: Contacto, token): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token)//le asigno la cabecera de la peticion, asigno el token del usuario
        let params = JSON.stringify(contacto);
        return this._http.post(this.url+'contacto',params,{headers:headers});
    }

    updateContact(contact: Contacto,token, id): Observable<any>{
        let params = JSON.stringify(contact);
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    
        return this._http.put(this.url+'contacto/'+id,params,{headers:headers})
      }
      

      deleteContact(token, id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'Application/json').set('Authorization', token);
        return this._http.delete(this.url + 'contacto/' + id, { headers: headers });
      }
}