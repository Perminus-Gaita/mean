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
*/

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthRoutingModule { }
