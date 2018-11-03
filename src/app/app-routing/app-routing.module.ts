import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'auth',
  loadChildren: 'app/auth/auth.module#AuthModule'
}, {
  path: 'admin',
  loadChildren: 'app/admin/admin.module#AdminModule'
}];
/*
The Angular Providers allow you to define set of Dependencies and
provides the concrete, runtime version of that dependencies when asked for it.
The Angular Components or services declare the dependencies they need in their 
constructor. The Injector reads the dependencies and looks for them in the Providers.
The Providers then instantiates the dependencies and provides them to the injector. 
The Injector then injects them into the Components/Services.
To Provide an instance of the service, the Angular Providers needs to know where to 
find the provider and how to instantiates it.
We let angular know that, we have a dependency to be injected by registering the 
dependency with the Providers.

          .forRoot()
It has to do with singletons. Angular services are loaded onto the page 1 time 
(singleton) and all references point back to this 1 instance.There is a risk that 
a lazy loaded module will try to create a 2nd instance of what should be a singleton, 
and the forRoot() method is a way to ensure that the app module / shared module / and 
any lazy loaded module all use the same 1 instance (the root instance).

The best approach is to create module with providers. Keep in mind that if your service 
is in shared module, you may get multiple instances of it. Best idea then is to configure 
module with Module.forRoot.
By convention, the forRoot static method both provides and configures services at the 
same time. It takes a service configuration object and returns a ModuleWithProviders.

Call forRoot only in the root application module, AppModule. Calling it in any other module, 
particularly in a lazy loaded module, is contrary to the intent and is likely to produce a runtime error.

Remember to import the result; don't add it to any other @NgModule list.
*/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
  declarations: []
})

export class AppRoutingModule {}
