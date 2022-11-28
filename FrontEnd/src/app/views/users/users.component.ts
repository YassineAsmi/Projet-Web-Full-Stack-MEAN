import { Component, OnInit } from '@angular/core';
import {Product,TopSelling, TableRows, Employee} from './user-data';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent  {

  topSelling:Product[];

  trow:TableRows[];

  constructor() { 

    this.topSelling=TopSelling;

    this.trow=Employee;
  }

}
