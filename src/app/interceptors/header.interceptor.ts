import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {TokenStorage} from '../auth/token.storage';

export class AuthHeaderInterceptor implements HttpInterceptor {
	intercept(req : HttpRequest <any>, next : HttpHandler) : Observable <HttpEvent<any>> {
			// Clone the request to add the new header
      const token = new TokenStorage();
      const tokenVal = token.getToken();
			const clonedRequest = req.clone({
			headers: req
				.headers
				.set('Authorization', tokenVal ? `Bearer ${ tokenVal}` : '')
		});

		// Pass the cloned request instead of the original request to the next handle
		return next.handle(clonedRequest);
	}
}

/*
A HTTP Interceptor enables you to catch HTTP requests and responses so that you can modify them. 
It is very useful especially when you want to add extra headers to all outgoing requests or catch error responses from the server.

One use case scenario for an interceptor is adding authorization header for authentication to all request. 
You could add an authorization header manually to all requests but that would be a lot of work. '
Or you could automatically intercept and append the header before sending the request to the server.

Another use case scenario is handling errors and caching of content. 
You can use an interceptor to catch errors and log them or serve cached content to the user instead of getting content from the server.


To implement an interceptor, declare a class that implements the intercept() method of the HttpInterceptor interface.
The intercept method transforms a request into an Observable that eventually returns the HTTP response. 
In this sense, each interceptor is fully capable of handling the request entirely by itself.

Most interceptors inspect the request on the way in and forward the (perhaps altered) request to the handle() method 
of the next object which implements the HttpHandler interface.

Like intercept(), the handle() method transforms an HTTP request into an Observable of HttpEvents which ultimately include 
the server's response. The intercept() method could inspect that observable and alter it before returning it to the caller.

>>The next object
The next object represents the next interceptor in the chain of interceptors. The final next in the chain is the HttpClient 
backend handler that sends the request to the server and receives the server's response.

Most interceptors call next.handle() so that the request flows through to the next interceptor and, eventually, the backend 
handler. An interceptor could skip calling next.handle(), short-circuit the chain, and return its own Observable with an 
artificial server response.

This is a common middleware pattern found in frameworks such as Express.js.

*/
