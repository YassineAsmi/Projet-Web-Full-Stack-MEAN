import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../_Services/auth.service';
import { StorageService } from '../../_Services/storage.service';
//declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  currentUser: any;
  showSubMenu = '';
  public sidebarnavItems:RouteInfo[]=[];
  // this is for the open close
  addExpandClass(element: string) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,private authService: AuthService,private storageService: StorageService
  ) {}

  // End open close
  ngOnInit() {
    this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
    this.currentUser = this.storageService.getUser();
  }
  public checkRoles(item:RouteInfo): boolean{
    let  display = true;
    if(item.roles){
      if(item.roles === 'admin'){
        if(this.storageService.isAdmin()){
          display = false
        }
        else{
          display =  true
        }
      }
      else if(item.roles === 'user'){
        if(this.storageService.isUser()){
          display = false
        }
        else{
          display = true
        }
      }
    }
    else{
      display = false
    }
    return display
  }

  onLogout() {
    this.authService.logout();
    this.storageService.clean();
    this.router.navigate(['/login']);
  }
}
