import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private serviceUrl: string = environment.apiURL;

  constructor(private http: HttpClient) { }

  authenticate(creds) {
    return of({ token: 'adfad 3434w4sdf dfc s' });
    // Calling the authentication service of DataServer.
    // return this.http.post(this.serviceUrl + 'authenticate', creds);
  }
}
