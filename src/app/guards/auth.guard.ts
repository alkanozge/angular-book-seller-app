import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {User} from "../models/user.model";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard {

  private currentUser: User=new User();

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.authenticationService.currentUser.subscribe(data => {
      this.currentUser=data;
    });
  }
  canActivate( route: ActivatedRouteSnapshot,
               state: RouterStateSnapshot):
      Observable<boolean
          | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree {
    if(this.currentUser){
      if(route.data['roles']?.indexOf(this.currentUser.role) === -1){
        this.router.navigate(['/401']);
        return false;
      }

      return true;
    }

    this.router.navigate(['/login']);
      return true;
  }


}
