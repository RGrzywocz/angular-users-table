import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userToken: string = "";
  userLogin: string = "";
  isUserLoggedIn: boolean = false;
  
  constructor() { }

}
