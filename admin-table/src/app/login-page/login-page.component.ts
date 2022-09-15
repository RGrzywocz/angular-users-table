import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  errorMessege: string = "";

  constructor(private db: DatabaseService, 
              private router: Router, 
              private user: UserService,
              private _snackBar: MatSnackBar) { }

  onRegisterClick(){
    if (this.loginForm.valid) {
      this.db.registerUserAndGetToken(this.loginForm.value.email, 
                                      this.loginForm.value.password)
      .subscribe({
        next: (response) => {
          this.user.userToken = response;
          
          this.user.isUserLoggedIn = true;
          this.user.userEmail = this.loginForm.value.email;
          this.router.navigate(['']);
          this._snackBar.open('Register succes', '', {
            duration: 1200
          });        
        },
        error: (error) => {
          this.errorMessege = error.error;
          this.loginForm.reset();
        }
      })
    }
  }
  onLoginClick(){
    if (this.loginForm.valid) {
      this.db.loginAndGetToken(this.loginForm.value.email, 
                               this.loginForm.value.password)
      .subscribe({
        next: (response) => {
          this.user.userToken = response.accessToken;
          this.user.isUserLoggedIn = true;
          this.user.userEmail = this.loginForm.value.email;
          this.router.navigate([''])
          this._snackBar.open('Login succes', '', {
          duration: 1200
        });
        },
        error: (error) => {
          this.errorMessege = error.error;
          this.loginForm.reset();
        }
      })
    }
  }
}
