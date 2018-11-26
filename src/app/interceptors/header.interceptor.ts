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
*/
