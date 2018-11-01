import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { AuthHeaderInterceptor } from './interceptors/header.interceptor';
import { CatchErrorInterceptor } from './interceptors/http-error.interceptor';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

/*
The property imports expects an array of modules.
Here's where we define the pieces of our puzzle (our application). 
The property declarations expects an array of components,
directives and pipes that are part of the module. 
The bootstrap property is where we define the root component of our module. 
Even though this property is also an array, 
99% of the time we are going to define only one component.
*/

/*
The first thing that we notice is that our module is importing 
the BrowserModule as an explicit dependency. The BrowserModule is 
a built-in module that exports basic directives, pipes and services. 
Unlike previous versions of Angular, we have to explicitly import 
those dependencies to be able to use directives like *ngFor or *ngIf 
in our templates.
*/

/*
Given that the root component of our module is the AppComponent
we have to list it in the bootstrap array. Because in the declarations 
property we are supposed to define all the components or pipes that make up 
our application, we have to define the AppComponent again there too.
*/

/* 
There are two types of modules, root modules and feature modules.
In the same way that in a module we have one root component and 
many possible secondary components, in an application we only have 
one root module and zero or many feature modules. To be able to bootstrap 
our application, Angular needs to know which one is the root module. 
An easy way to identify a root module is by looking at the imports property 
of its NgModule decorator. If the module is importing the BrowserModule 
then it's a root module, if instead is importing the CommonModule then 
it is a feature module.+
We need to take care of importing the BrowserModule in the root module and 
instead, import the CommonModule in any other module we create for the same
application. Failing to do so might result in problems when working with 
lazy loaded modules as we are going to see in following sections.
By convention, the root module should always be named AppModule.
*/

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    AuthModule,
    AdminModule,
    AppRoutingModule,
  ],
  /*
  Be aware that this method of defining a service in the providers property 
  should only be used in the root module. Doing this in a feature module is 
  going to cause unintended consequences when working with lazy loaded modules.
  */
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHeaderInterceptor,
    multi: true,
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: CatchErrorInterceptor,
    multi: true,
  }],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
