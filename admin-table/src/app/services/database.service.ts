import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Client } from '../models/Client';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  token:string = "";
  constructor(private http: HttpClient) { }
  baseUrl : string = "http://localhost:3000";

  registerUserAndGetToken(email: string, password: string): Observable<string>{
    return this.http.post<string>(this.baseUrl + "/register", {"email": email, "password": password});
  }

  loginAndGetToken(email: string, password: string){
    return this.http.post<any>(this.baseUrl + "/login", {"email": email, "password": password})
  }

  getAllClients(){
    return this.http.get<Client[]>(this.baseUrl + "/clients");
  }

  deleteClient(clientId: number){
    return this.http.delete<any>(this.baseUrl + "/clients/" + clientId);
  }

  addClient(firstName:string, lastName:string, birthday:string, industry:string){
    return this.http.post<any>(this.baseUrl + "/clients", {
      firstName:firstName,
      lastName:lastName,
      birthday:birthday,
      industry:industry
    });
  }

  editClient(clientId:number, firstName:string, lastName:string, birthday:string, industry:string){
    return this.http.put<any>(this.baseUrl + "/clients/" + clientId, {
      firstName:firstName,
      lastName:lastName,
      birthday:birthday,
      industry:industry
    });
  }
}
