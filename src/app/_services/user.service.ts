import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';



import {Observable} from 'rxjs';

import { User } from "../_models";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

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

  deleteUser(user: User): Observable<User> {
    console.log('inside service')
    user.deleted = !user.deleted;
    return this.http.put<User>(`http://localhost:8080/users/delete/` + user.deleted + '/user/' + user.id, {});
  }

  register(user: User) {
    return this.http.post(`${config.apiUrl}/users/register`, user);
  }

  editUser(user: User): Observable<User> {
    return this.http.put<User>(`http://localhost:8080/users/edit`, user, httpOptions);
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

