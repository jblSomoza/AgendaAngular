import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactoService } from 'src/app/services/contacto.service';
import { Contacto } from 'src/app/models/contact.model';
import { GLOBAL } from 'src/app/services/global.service';
import { UserService } from 'src/app/services/user.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css'],
  providers: [ContactoService,UserService,UploadService]
})
export class ContactosComponent implements OnInit {
  @ViewChild('formAddContacto') formValuesAddContacto;//HTML es hijo del TS

  public url;
  public identity;
  public token;
  public status: string;

  public contactsFound: Contacto;
  public contactosModel: Contacto;
  public filesToUpload: Array<File>;

  constructor(
    private _contactoService: ContactoService,
    private _userService: UserService,
    private _uploadService: UploadService
  ) {
    this.url =GLOBAL.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.contactosModel = new Contacto(
      "",
      "",
      {nombres:"",apellidos:"",apodo:"",correo:"",direccion:"",image:"",telefono:""}
       )
   }

  ngOnInit() {
    this.getContactos();
  }

  getContactos(){
    this._contactoService.getContactos(this.token).subscribe(
      response=>{
        if(response.contactsFound){
          console.log(response.contactsFound)
          this.contactsFound = response.contactsFound
          this.status='ok'
        }
      },
      error =>{
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status = 'error'
        }
      }
    )
  }

  addContacto(){
    this._contactoService.addContactos(this.contactosModel,this.token).subscribe(
      response =>{
        if(response.message){
  
         // this.formValuesAddContacto.resetForm();
          this.getContactos();
          this.status = 'ok'
          }
      },
      error =>{
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status = 'error'
        }
      }
    )
  }

  updateContact(id) {
    this._contactoService.updateContact(this.contactosModel,this.token, id)
      .subscribe(response => {
        !response.contact ? this.status = 'error' : (
          this.status = 'ok',
          this.getContactos()
        )
      }, error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null)
          this.status = 'error';
      })
  }

  deleteContact(id) {
    this._contactoService.deleteContact(this.token, id)
      .subscribe(response => {
        if (response.contact) {
          console.log(response.ok);
          this.getContactos();
          this.status = 'ok';
        }
      }, error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null)
          this.status = 'error';
      });
  }


  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
