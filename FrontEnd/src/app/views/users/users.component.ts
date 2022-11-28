import { Component, OnInit } from '@angular/core';
import {Product,TopSelling, TableRows, Employee} from './user-data';
import { AuthService } from '../../_Services/auth.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent  {
  closeResult = '';
  topSelling:Product[];
  user: any = {
    username: null,
    email: null,
    password: null
  };
  isUserAddFailed = false;
  submitted = false;
  errorMessage = '';
  trow:TableRows[];

  constructor(private authService: AuthService,private modalService: NgbModal) { 

    this.topSelling=TopSelling;

    this.trow=Employee;
  }
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
  newUser(): void {
    this.submitted = false;
    this.user = {
      username: null,
      email: null,
      password: null
    };
  }
addUser(){
 /* this.authService.register(this.form).subscribe(
    data => {
      this.alertService.success('Registration successful', true);
      this.router.navigate(['/login']);
    }
  );
  */
}
deleteUser(){
  console.log("delete user");
}

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
