﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



import {Observable} from 'rxjs';

import { User } from "../_models";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<User[]>(`${config.apiUrl}/users`);
  }

  getByUsername(username: string): Observable<User> {
    return this.http.get<User>(`http://localhost:8080/users/` + username);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:8080/users/all`);
  }

  deleteUser(id: number, isDeleted: boolean){
    console.log('inside service')
    return this.http.put(`http://localhost:8080/users/deleted/` + isDeleted + '/user/' + id,{});
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

