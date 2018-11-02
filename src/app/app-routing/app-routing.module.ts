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
*/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
  declarations: []
})

export class AppRoutingModule {}
