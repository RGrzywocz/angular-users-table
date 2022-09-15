import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public get userToken(){
    return localStorage.getItem("userToken");
  }
  public set userToken(value: any){
    localStorage.setItem("userToken", value);
  }
  public get userEmail(){
    return localStorage.getItem("userEmail");
  }
  public set userEmail(value: any){
    localStorage.setItem("userEmail", value);
  }
  public get isUserLoggedIn(){
    return localStorage.getItem("isUserLoggedIn");
  }
  public set isUserLoggedIn(value: any){
    localStorage.setItem("isUserLoggedIn", value);
  }
  
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
