import { Component, Input, OnInit } from '@angular/core';
import {User} from './user-data';
import { AuthService } from '../../_Services/auth.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent  {
  closeResult = '';
  title = 'Angular Search Using ng2-search-filter';
  searchText: any;
  @Input()  currentuser: User = {
    id: '',
    username: '',
    email: '',
    password: ''
  };
  user: any = [];
  isUserAddFailed = false;
  submitted = false;
  errorMessage = '';
  currentIndex = -1;
  @Input() viewMode = false;
 @Input() userGet: User = {};
  constructor(private authService: AuthService,private modalService: NgbModal) { }
  
  ngOnInit(): void {
    if (!this.viewMode) {
      this.getAllUsers();
    }   
  }
  // Add new user
  saveUser(): void {
    const { username,email, password } = this.user;
    this.authService.register(username,email,password).subscribe({
      next: () => {
        console.log('User created successfully!');
        this.submitted = true;
        this.isUserAddFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isUserAddFailed = true;
      }
    });
 
  }

  //initaliaze user field in modal
  newUser(): void {
    this.submitted = false;
    this.user = {
      username: null,
      email: null,
      password: null
    };
  }
  refreshList(): void {
    this.getAllUsers();
    this.currentuser = {};
    this.currentIndex = -1;
  }
  setActiveUser(users: User, index: number): void {
    this.currentuser = users;
    this.currentIndex = index;
  }
deleteUser(id:any){
  console.log('this id : '+id);
  this.authService.deleteUser(id).subscribe({
    next: (res) => {
      console.log(res);
      this.refreshList();
      console.log('this id : '+this.currentuser.id);
    },
    error: (e) => console.error(e)
  });
}
//get all users
getAllUsers() {
  this.authService.getAllUsers().subscribe({
    next: data => {
      this.userGet = data;
      this.currentuser = data;
    },
    error: err => {
      this.errorMessage = err.error.message;
    }
  });
}


// for modal open
open(modalAddUser : any) {
  this.modalService.open(modalAddUser, { ariaLabelledBy: 'modal-basic-title' }).result.then(
    (result) => {
      this.closeResult = `Closed with: ${result}`;
      this.newUser();
    },
    (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    },
  );
}
//for modal dismiss
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}


}
