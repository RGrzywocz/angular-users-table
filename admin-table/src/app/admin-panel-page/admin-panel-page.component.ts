
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from '../models/Client';
import { DatabaseService } from '../services/database.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-panel-page',
  templateUrl: './admin-panel-page.component.html',
  styleUrls: ['./admin-panel-page.component.css']
})
export class AdminPanelPageComponent implements AfterViewInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'birthday', 'industry', 'deletion'];
  clients!: MatTableDataSource<Client>; 
  userEmail: string = ""
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  ngAfterViewInit() {
    
  }

  constructor(private user: UserService, 
              private db: DatabaseService, 
              private _liveAnnouncer: LiveAnnouncer,
              private _snackBar: MatSnackBar) {
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

   announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
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
}
