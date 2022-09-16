# AdminTable

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.2.
The idea of the project is to create an application, allowing 

## Running app

1. Run `npm install` to install all needed packages
2. Run `npm install -g json-server` to install json server on Your machine
2. Run `json-server db.json -m ./node_modules/json-server-auth` to start json-server for database
3. Run `ng serve` to start the appliaction
4. Go to http://localhost:4200/


## Config

config is not yet prepared, You can find list of possible industries of an user in 
admin-panel-page.component.ts

## Client 

Client class:
    id: number;
    firstName: string;
    lastName: string;
    birthday: string;
    industry: string;

