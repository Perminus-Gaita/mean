import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

/*
Services are classes just like components, 
          @Component = Angular Component
          @NgModule = Angular Module
          @Injectable = Angular Service
The visibility modifiers like: private, public and protected add the constructor argurments to member variables making them 
available throughout the whole class.

          Service Injection Context
The list of services available to all components in your application. It is a shared space where all the components can access
the services available as ling as they are somehow inported into the root module
*/
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public router: Router) {}

    canActivate() {
      const user = (<any>window).user;
      if (user) return true;

      // not logged in so redirect to login page with the return url
      this.router.navigate(['/auth/login']);
      return false;
  }
}
