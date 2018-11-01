import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

/*
To bootstrap our module based application, we need to inform Angular 
which one is our root module to perform the compilation in the browser.
This is done by declaring the root module inside the "bootstrapModule()" 
function: platformBrowserDynamic().bootstrapModule(AppModule);
This compilation in the browser is also known as "Just in Time" (JIT) compilation.+

It is also possible to perform the compilation as a build step of our workflow. 
This method is called "Ahead of Time" (AOT) compilation and will require a 
slightly different bootstrap process.
*/
