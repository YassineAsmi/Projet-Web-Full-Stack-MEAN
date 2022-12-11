import { Component, OnInit, Injectable } from '@angular/core';
import { AuthService } from '../../_Services/auth.service';
import { StorageService } from '../../_Services/storage.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private storageService: StorageService,private router: Router) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.router.navigate(['/admin']);
      this.roles = this.storageService.getUser().roles;
      this.authService.logout();
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        if(data){
          this.storageService.saveUser(data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.storageService.getUser().roles;
          this.reloadPage();
          this.setRoles(data)
        }

      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }
  private setRoles(data:any):void {
     const token = this.storageService.getDecodedAccessToken(data?.token)
     if(token.roles.length > 0){
      localStorage.setItem('ROLES',token.roles[0]?.name);
     }
  }

  reloadPage(): void {
   //window.location.reload();

   this.router.navigate(['/admin']);
}
}
