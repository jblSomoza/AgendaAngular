import {ModuleWithProviders} from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//COMPONENTS
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { RegistrarComponent } from './components/registrar/registrar.component';

const appRoutes: Routes =[
    {path: '', component: HomeComponent},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    
    {path: 'login', component: LoginComponent},
    {path: 'perfil', component: PerfilComponent},
    {path: 'registrar', component: RegistrarComponent},
    {path: '**', component:HomeComponent}
];

export const appRoutingProviders: any[]=[];
export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes)