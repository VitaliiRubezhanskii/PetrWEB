import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';
import {Customer} from '../_models/customer';
import {Observable} from 'rxjs';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<User[]>(`${config.apiUrl}/users`);
  }

  getByUsername(username: string): Observable<Customer> {
    return this.http.get<Customer>(`http://localhost:8080/users/` + username);
  }

  getAllUsers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`http://localhost:8080/users`);
  }

  register(user: User) {
    return this.http.post(`${config.apiUrl}/users/register`, user);
  }

  update(user: User) {
    return this.http.put(`${config.apiUrl}/users/` + user.id, user);
  }

  delete(id: number) {
    return this.http.delete(`${config.apiUrl}/users/` + id);
  }
}

// @Injectable()
//   export class CustomerResolver implements Resolve<Customer[]> {
//   constructor(private userService: UserService) {}
//       resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Customer[]> | Promise<Customer[]> | Customer[] {
//         return this.userService.getAllUsers();
//       }
//     }

