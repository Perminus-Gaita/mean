import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';

const routes: Routes = [{
  path: 'auth',
  children: [{
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'register',
    component: RegisterComponent
  }]
}];

/*
We are using a property called exports. We should only export 
whatever the other modules in our application need to perform its job. 
In our case, we only need to make the RouterModule visible because 
it's being used to direct links to certain paths.

When a module is lazy loaded, Angular is going to create a child injector
(which is a child of the root injector from the root module) and will 
create an instance of our service there.

As a rule of thumb, always use the forRoot syntax when exporting services 
from feature modules, unless you have a very special need that requires 
multiple instances at different levels of the dependency injection tree.
*/

@NgModule({
  /*
  Angular creates a lazy-loaded module with its own injector, a child of 
  the root injector… So a lazy-loaded module that imports that shared module 
  makes its own copy of the service.
*/
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthRoutingModule { }
