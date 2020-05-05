import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  submitted = false;
  loginForm: FormGroup;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }
  onSubmit() {

    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService
      .authenticate({ username: this.loginForm.value.username, password: this.loginForm.value.password })
      .subscribe((resp: any) => {
        // Storing the response from DataServer. If authtication is success, the response is token, else, an exception message.
        sessionStorage.setItem('token', resp.token);
        if (resp.token !== undefined) {
          this.router.navigate(['dashboard']);
        } else {
          this.router.navigate(['']);
        }
      },
        error => {
          console.log(error);
        }
      );
  }
}
