import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'
import { Client } from '../models/Client';
import { DatabaseService } from '../services/database.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-panel-page',
  templateUrl: './admin-panel-page.component.html',
  styleUrls: ['./admin-panel-page.component.css']
})
export class AdminPanelPageComponent {
  displayedColumns: string[] = ['firstName', 'lastName', 'birthday', 'industry', 'deletion'];
  clients!: MatTableDataSource<Client>; 
  userEmail: string = ""
  industries: string[] = ["Finances", "Media", "Journeys"];
  showAddingNewClient = false;

  newClientForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    birthday: new FormControl<Date>(new Date()),
    industry: new FormControl('')
  });
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private user: UserService, private db: DatabaseService, private _snackBar: MatSnackBar) {
    this.userEmail = this.user.userEmail;
    this.updateClientTable();
   }

  updateClientTable(){
    this.db.getAllClients().subscribe({
      next: (response) => {
        this.clients = new MatTableDataSource<Client>(response);
        this.clients.paginator = this.paginator;
        this.clients.sort = this.sort;},
      error: (error) => alert(error)
    })
  }

   onLogoutClick(){
    this.user.logout();
   }

  removeClient(element:Client){
    if(confirm("Are You sure, You want to delete " + element.firstName + " from database?")){
      this.db.deleteClient(element.id).subscribe({
        next: (response) => {
          this._snackBar.open("Client removed " + element.firstName + " " + element.lastName, '', {
            duration: 1200
          });
        },
        error: (error) => {console.log(error)},
        complete: ()=> this.updateClientTable()
      }
      )
    }   
  }

  editClient(element:Client){
    //todo
  }

  openAddingFields(){
    this.showAddingNewClient = true;
  }
  onAddNewClientClick(){
    //checking data
    if(this.newClientForm.value.firstName == ""){
      this._snackBar.open("First name cannot be empty ", '', {
        duration: 1200
      });
      return;
    }
    if(this.newClientForm.value.lastName == ""){
      this._snackBar.open("Last name cannot be empty ", '', {
        duration: 1200
      });
      return;
    }
    var datesDiff = new Date().getTime() - this.newClientForm.value.birthday.getTime();
    datesDiff /= (60 * 60 * 24);
  
    if(new Date().getFullYear() - this.newClientForm.value.birthday.getFullYear()< 18)
    {
      this._snackBar.open("Client must be atleast 18 years old ", '', {
        duration: 1200
      });
      return;
    }

    this.db.addClient(this.newClientForm.value.firstName, 
                      this.newClientForm.value.lastName, 
                      this.newClientForm.value.birthday,
                      this.newClientForm.value.industry)
                      .subscribe({
                        next: (reponse) => this
                        ._snackBar.open("Client has been added " + this.newClientForm.value.firstName + " " + this.newClientForm.value.lastName, '', {
                          duration: 1200
                        }),
                        error: (error) => alert(error),
                        complete: ()=> {
                          this.showAddingNewClient = false;
                          this.updateClientTable();
                        }
                      })
  }

  onDissmisNewClientClick(){
    this.newClientForm.reset();
    this.showAddingNewClient = false;
  }
}
