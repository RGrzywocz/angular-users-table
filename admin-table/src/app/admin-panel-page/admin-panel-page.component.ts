import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../models/Client';
import { DatabaseService } from '../services/database.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-panel-page',
  templateUrl: './admin-panel-page.component.html',
  styleUrls: ['./admin-panel-page.component.css']
})
export class AdminPanelPageComponent implements OnInit {
  users: Client[] = [];
  
  

  constructor() {
    
   }

  ngOnInit(): void {
    
  }

  
}
