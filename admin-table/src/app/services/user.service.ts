import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userToken: any = "";
  userEmail: string = "";
  isUserLoggedIn: boolean = false;
  
  constructor(private _snackBar: MatSnackBar, private router: Router) { }

  logout(){
    this.userToken = "";
    this.userEmail = "";
    this.isUserLoggedIn = false;
    this._snackBar.open('Unlogged', '', {
      duration: 1200
    }); 
    this.router.navigate(["login"]);
  }
}
