import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './auth.service';
import { TokenStorage } from './token.storage';
import { AuthRoutingModule } from './auth-routing.module';

/*
Our feature AuthModule it's pretty similar to the root AppModule 
with a few important differences:+
We are not importing the BrowserModule but the CommonModule. 
If we see the documentation of the BrowserModule here: https://angular.io/api/platform-browser/BrowserModule, 
we can see that it's re-exporting the CommonModule with a lot of other 
services that helps with rendering an Angular application in the browser. 
These services are coupling our root module with a particular platform 
(the browser), but we want our feature modules to be platform independent. 
That's why we only import the CommonModule there, which only exports 
common directives and pipes.
When it comes to components, pipes and directives, every module should 
import its own dependencies disregarding if the same dependencies were 
imported in the root module or in any other feature module. In short, 
even when having multiple feature modules, each one of them needs to 
import the CommonModule.

We are using a new property called exports. Every element defined in 
the declarations array is private by default. We should only export 
whatever the other modules in our application need to perform its job. 
In our case, we only need to make the *Component* visible because 
it's being used in the template of the AppComponent.
*/


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  /*
  Here's the tricky part of Angular modules. While components, pipes and 
  directives are scoped to its modules unless explicitly exported, services
  are globally available unless the module is lazy loaded.
  
  Notice that the two services below are not in the exports array but in the 
  providers array. With this configuration, our service is going to be 
  available everywhere, even in the AppComponent which lives in another module.
  So, even when using modules, there's no way to have a "private" service unless... 
  the module is being lazy loaded.
  
  Dependency injection is the practice of passing in the object’s collaborators 
  (the code objects that our object depends on) into it, rather than creating 
  them inside the object.
  */
  providers: [
    AuthService,
    TokenStorage
  ]
})
export class AuthModule { }
