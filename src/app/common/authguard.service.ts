import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(private router: Router ) {
    }
   /**
    * canActive method check token exist in session or not.
    * if token exist then moveforward otherwise redirect into login.
    */
    canActivate(): boolean {

    if (sessionStorage.getItem('token') !== null) {
        return true;
    } else {
        this.router.navigate(['']);
        return false;
    }
}
}
