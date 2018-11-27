import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtModule } from '@auth0/angular-jwt';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) { }

    login(username: string, password: string) {
        return this.http.post<any>(`http://localhost:8080/token/generate-token`, { username: username, password: password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('username', username);
                }
                return username;
            }));
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    isAuthorized(allowedRoles: string[]): boolean {
    // check if the list of allowed roles is empty, if empty, authorize the user to access the page
    if (allowedRoles == null || allowedRoles.length === 0) {
      console.log(allowedRoles)
      return true;
      }
    const token = localStorage.getItem('currentUser');
    const decodeToken = this.jwtHelperService.decodeToken(token);
    console.log(decodeToken);
    if (!decodeToken) {
      console.log('Invalid token');
      return false;
    }
    return allowedRoles.includes(decodeToken['scopes']);




    }
}
