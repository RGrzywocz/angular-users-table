
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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
  displayedColumns: string[] = ['firstName', 'lastName', 'birthday', 'industry'];
  clients!: MatTableDataSource<Client>; 
  userEmail: string = ""
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  ngAfterViewInit() {
    
  }

  constructor(private user: UserService, private db: DatabaseService, private _liveAnnouncer: LiveAnnouncer) {
    this.userEmail = this.user.userEmail;
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
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
