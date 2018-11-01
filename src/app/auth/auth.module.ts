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
  providers: [
    AuthService,
    TokenStorage
  ]
})
export class AuthModule { }
