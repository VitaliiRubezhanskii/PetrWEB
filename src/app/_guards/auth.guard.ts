import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {UserService} from '../_services';
import {Customer} from '../_models/customer';

@Injectable()
export class AuthGuard implements CanActivate {
    customer: Customer = null;
    constructor(private router: Router, private userService: UserService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const username = localStorage.getItem('username');
      console.log(username + ' auth guard')
      // this.userService.getByUsername(username).subscribe(result => {this.customer.role = result.role;
      // console.log('FROM getByUsername' + this.customer.role); });

      if (localStorage.getItem('currentUser') ) {
        // && this.customer.role === 'USER'
            // logged in so return true
        this.router.navigate(['admin']);
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
