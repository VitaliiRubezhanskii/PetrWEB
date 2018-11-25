import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {UserService} from '../_services';
import {Customer} from '../_models/customer';

@Injectable()
export class AuthGuard implements CanActivate {
    customer: Customer;
    constructor(private router: Router, private userService: UserService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const username = localStorage.getItem('username');
      this.userService.getByUsername(username).subscribe(result => this.customer = result)
      if (localStorage.getItem('currentUser') && this.customer.role === 'ADMIN') {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
