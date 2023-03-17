import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    loadComponent: ()=> import('./app.component').then(m => m.AppComponent), 
    pathMatch: 'full'
  },
  {
    path: 'projects',
    loadComponent:()=> import('./componentes/projects/projects.component').then(m => m.ProjectsComponent)
  },
  {
    path: 'resume',
    loadComponent:()=> import('./componentes/skills/skills.component').then(m => m.SkillsComponent)
  },
  {
    path: 'contact',
    loadComponent:()=> import('./componentes/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'login',
    loadComponent: ()=> import('./auth/login/login.component').then(m => m.LoginComponent), 
  }
];

