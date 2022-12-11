import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private storageService: StorageService,
              private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree  {
      let guarded = false;
    if(route.data.roles === 'admin'){
      if(this.storageService.isAdmin()){
        guarded =  true
      }
      else{
        guarded = false
        this.router.navigate(['/dashboard'])
      }
    }
    return guarded;
  }
  
}
