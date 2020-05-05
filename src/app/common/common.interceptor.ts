import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, observable } from 'rxjs';
import { finalize, tap, catchError, retryWhen, concatMap, delay, timeout } from 'rxjs/operators';
import { Router } from '../../../node_modules/@angular/router';


@Injectable()
export class Interceptor implements HttpInterceptor {

    count = 0;

    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.count++;
        const authToken = sessionStorage.getItem('token');
        if (authToken) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${authToken}`
                }
            });
        }

        return next.handle(req)

            .pipe(catchError(err => {
                if (err.status === 401) {
                    // auto logout if 401 response returned from api
                    localStorage.clear();
                    sessionStorage.clear();
                    window.alert('Session expired !\nPlease, refresh the page to log on.');
                    this.router.navigate(['']);
                }
                return throwError(new Error(err.message));
            }),
                timeout(30000),
                retryWhen(errors => errors
                    .pipe(
                        concatMap((error, count) => {
                            if (count < 5 && (error.status === 400 || error.status === 0)) {
                                return throwError(error.status);
                            }
                            // window.alert("oops something went wrong please try again");
                            return throwError(new Error('Retry limit exceeded!'));
                        }),
                        delay(1000)
                    )
                )
            );
    }


}
