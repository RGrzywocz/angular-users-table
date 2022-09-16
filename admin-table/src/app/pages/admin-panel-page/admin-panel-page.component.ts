import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'
import { Client } from '../../models/Client';
import { DatabaseService } from '../../services/database.service';
import { UserService } from '../../services/user.service';

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
  showEditingClient = false;
  storeEditingId:number = 0;

  newClientForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    birthday: new FormControl<Date>(new Date()),
    industry: new FormControl('')
  });

  editClientForm: FormGroup = new FormGroup({
    firstName: new FormControl('hmm'),
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

  onLogoutClick(){
    this.user.logout();
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

  onRemoveClientClick(element:Client){
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

  onEditClientClick(element:Client){
    this.showEditingClient = true;
    this.storeEditingId = element.id; 
    this.editClientForm.setValue({
      firstName: element.firstName,
      lastName: element.lastName,
      birthday: new Date(element.birthday), 
      industry: element.industry
    });
   
  }

  openAddingClientFields(){
    this.showAddingNewClient = true;
  }

  onAddNewClientConfirmClick(){
    //checking data
    if(this.newClientForm.value.firstName == ""){
      this._snackBar.open("First name cannot be empty ", '', {
        duration: 2000
      });
      return;
    }
    if(this.newClientForm.value.lastName == ""){
      this._snackBar.open("Last name cannot be empty ", '', {
        duration: 2000
      });
      return;
    }
    var datesDiff = new Date().getTime() - this.newClientForm.value.birthday.getTime();
    datesDiff /= (60 * 60 * 24);
  
    if(new Date().getFullYear() - this.newClientForm.value.birthday.getFullYear()< 18)
    {
      this._snackBar.open("Client must be atleast 18 years old ", '', {
        duration: 2000
      });
      return;
    }
    if(this.newClientForm.value.industry == ""){
      this._snackBar.open("Industry must be chosen", '', {
        duration: 2000
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

  onEditClientConfirmClick(){
    if(this.editClientForm.value.firstName == ""){
      this._snackBar.open("First name cannot be empty ", '', {
        duration: 2000
      });
      return;
    }
    if(this.editClientForm.value.lastName == ""){
      this._snackBar.open("Last name cannot be empty ", '', {
        duration: 2000
      });
      return;
    }
    var datesDiff = new Date().getTime() - this.editClientForm.value.birthday.getTime();
    datesDiff /= (60 * 60 * 24);
  
    if(new Date().getFullYear() - this.editClientForm.value.birthday.getFullYear()< 18)
    {
      this._snackBar.open("Client must be atleast 18 years old ", '', {
        duration: 2000
      });
      return;
    }
    if(this.editClientForm.value.industry == ""){
      this._snackBar.open("Industry must be chosen", '', {
        duration: 2000
      });
      return;
    }

    this.db.editClient(this.storeEditingId, 
                      this.editClientForm.value.firstName, 
                      this.editClientForm.value.lastName, 
                      this.editClientForm.value.birthday,
                      this.editClientForm.value.industry)
                      .subscribe({
                        next: (reponse) => {
                          this._snackBar.open("Client has been edited " + this.editClientForm.value.firstName + " " + this.editClientForm.value.lastName, '', {
                          duration: 2000
                        });
                        console.log(reponse);
                      },
                        error: (error) => alert(error),
                        complete: ()=> {
                          this.showEditingClient = false;
                          this.updateClientTable();
                        }
                      })
  }

  onDissmisEditClientClick(){
    this.editClientForm.reset();
    this.showEditingClient = false;
  }
}
