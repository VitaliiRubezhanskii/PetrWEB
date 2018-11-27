import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild} from '@angular/router';
import {AuthenticationService, UserService} from '../_services';
import {Observable} from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(
                private router: Router,
                private userService: UserService,
                private authenticationService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const allowedRoles = route.data.allowedRoles;
      const username = localStorage.getItem('username');
      const isAuthorized = this.authenticationService.isAuthorized(allowedRoles);
      console.log(username + ' auth guard')
        // not logged in so redirect to login page with the return url
      if (!isAuthorized) {
        this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
        return false;
      }
        return isAuthorized;
    }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const allowedRoles = next.data.allowedRoles;
    const isAuthorized = this.authenticationService.isAuthorized(allowedRoles);

    if (!isAuthorized) {
      // if not authorized, show access denied message
      this.router.navigate(['/accessdenied']);
    }

    return isAuthorized;
  }
}
