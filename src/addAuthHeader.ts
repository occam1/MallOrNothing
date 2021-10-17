import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AddAuthHeader implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('JWT');
    const auth = 'Bearer ' + token;
    const reqWithHeaders = (req.clone({
        headers: req.headers.set('Authorization',auth)
    }));
    console.log('intercepting');
    console.log(reqWithHeaders);
    console.log('intercepted');
    return next.handle(reqWithHeaders)
    }
}