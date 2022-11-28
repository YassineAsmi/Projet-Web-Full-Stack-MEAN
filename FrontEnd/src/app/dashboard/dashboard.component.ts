import { Component, AfterViewInit } from '@angular/core';
//declare var require: any;
import { StorageService } from '../_Services/storage.service';
import {Router} from '@angular/router'

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit {
  subtitle: string;
  constructor(private StorageService: StorageService,private router: Router) {
    this.subtitle = 'This is some text within a card block.';
  }

  ngOnInit(): void {
    if (!this.StorageService.isLoggedIn()) {
      this.router.navigate(['/login']);

    }
  }
  ngAfterViewInit() { }
}
