import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
/*
RxJs is a library for reactive programming using Observables, 
to make it easier to compose asynchronous or callback based code

Obsevables allow and offer operators to be used with the data.
Operators allow you to transform how data is handled, used or looks like.
The biggest advantage with observables is the funnel like approach that 
make it very easy to write structured statements handling asynchronous code and 
the operators we can use in that funnel to transform the data.
*/

import { TokenStorage } from './token.storage';
import { TooltipComponent } from '@angular/material';

@Injectable()
/*
@Injectable is normally used for Dart metadata generation. The metadata generated
makes it possible for the AuthService class to be able to use other services in it's
constructor's parameters. Without it, 
          Angular will basically say that it can’t resolve 
          the Http dependency of AuthService because Angular 
          doesn’t know the type and therefore, 
          no provider that can be used to resolve the dependency. 
The metadata generated helps Angular know the type.

Decorators add metadata to our code.

@Injectable() lets Angular know that a class can be used with the dependency injector. 
@Injectable() is not strictly required if the class has other Angular decorators on it 
or does not have any dependencies. What is important is that any class that is going to 
be injected with Angular is decorated. However, best practice is to decorate injectables 
with @Injectable(), as it makes more sense to the reader.

In the code below Angular's injector determines what to inject into AuthService's constructor 
by using type information. This is possible because these particular dependencies are typed, 
and are not primitive types. In some cases Angular's DI needs more information than just types.
*/
export class AuthService {

  constructor(private http : HttpClient, private token: TokenStorage) {}

  public $userSource = new Subject<any>();

  login(email : string, password : string) : Observable <any> {
    return Observable.create(observer => {
      this.http.post('/api/auth/login', {
        email, 
        password
      }).subscribe((data : any) => {
          observer.next({user: data.user});
          this.setUser(data.user);
          this.token.saveToken(data.token);
          observer.complete();
      })
    });
  }

  register(fullname : string, email : string, password : string, repeatPassword : string) : Observable <any> {
    return Observable.create(observer => {
      this.http.post('/api/auth/register', {
        fullname,
        email,
        password,
        repeatPassword
      }).subscribe((data : any) => {
        observer.next({user: data.user});
        this.setUser(data.user);
        this.token.saveToken(data.token);
        observer.complete();
      })
    });
  }

  setUser(user): void {
    if (user) user.isAdmin = (user.roles.indexOf('admin') > -1);
    this.$userSource.next(user);
    (<any>window).user = user;
  }

  getUser(): Observable<any> {
    return this.$userSource.asObservable();
  }

  me(): Observable<any> {
    return Observable.create(observer => {
      const tokenVal = this.token.getToken();
      if (!tokenVal) return  observer.complete();
      this.http.get('/api/auth/me').subscribe((data : any) => {
        observer.next({user: data.user});
        this.setUser(data.user);
        observer.complete();
      })
    });
  }

  signOut(): void {
    this.token.signOut();
    this.setUser(null);
    delete (<any>window).user;
  }
}

/*
@Inject() is a manual mechanism for letting Angular know that a parameter must be injected.
It can be used like so:

    import { Component, Inject } from '@angular/core';
    import { ChatWidget } from '../components/chat-widget';

    @Component({
      selector: 'app-root',
      template: `Encryption: {{ encryption }}`
    })
    export class AppComponent {
      encryption = this.chatWidget.chatSocket.encryption;

      constructor(@Inject(ChatWidget) private chatWidget) { }
    }
    
    
In the above we've asked for chatWidget to be the singleton Angular associates with the class 
symbol ChatWidget by calling @Inject(ChatWidget). It's important to note that we're using 
ChatWidget for its typings and as a reference to its singleton. We are not using ChatWidget 
to instantiate anything, Angular does that for us behind the scenes.

When using TypeScript, @Inject is only needed for injecting primitives. 
TypeScript's types let Angular know what to do in most cases. 
The above example would be simplified in TypeScript to:

    import { Component } from '@angular/core';
    import { ChatWidget } from '../components/chat-widget';

    @Component({
      selector: 'app',
      template: `Encryption: {{ encryption }}`
    })
    export class App {
      encryption = this.chatWidget.chatSocket.encryption;

      constructor(private chatWidget: ChatWidget) { }
    }
    
    
    TYPINGS IN TYPESCRIPT
JavaScript is untyped, meaning that we can pass around and use data, objects and functions 
with no constraints. We can write code that calls methods that don't exist on an object, 
or reference variables that we don't have. These kinds of mistakes can be hard to discover 
when you are writing code, and it can lead to unstable and buggy code. Doing big changes 
of your code can become difficult and risky as you don't immediately see if some changes 
conflicts with the rest of the code somewhere else.

TypeScript is mainly about adding types to JavaScript. That means that TypeScript requires 
you to accurately describe the format of your objects and your data. When you do that, 
that means that the compiler can investigate your code and discover errors. It can see that 
you are trying to call a function with the wrong kinds of arguments, or reference a variable 
that is not accessible in the current scope.

When you write TypeScript yourself, this formal description of the code is part of the code itself.

However, when you use external libraries like jQuery or moment.js, there are no information of 
the types in that code. So in order to use it with TypeScript, you also have to get files that 
describe the types of that code. These are the type declaration files, most often with the file 
extension name .d.ts. Fortunately people have written those kinds of type declaration files for 
most common javascript libraries out there.

Typings was just a tool to install those files. It is now best practice to just use npm.

When you have installed those files, which basically only means downloading them and placing them 
in your project, the TypeScript compiler will understand* that external code and you will be able
to use those libraries. Otherwise you would only get errors everywhere.



    PRIMITIVE TYPES
In computer science, primitive data type is either of the following:(a basic type or a built in type)

a basic type is a data type provided by a programming language as a basic building block. 
Most languages allow more complicated composite types to be recursively constructed starting 
from basic types.

a built-in type is a data type for which the programming language provides built-in support.
 
*/
