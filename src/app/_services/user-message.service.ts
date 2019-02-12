import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserMessage} from '../_models/userMessage';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserMessageService {

  constructor(private http: HttpClient) {}

  send(message: UserMessage) {
    return this.http.post(`http://localhost:8080/user/messages/send`, message, httpOptions);
  }
  getAllMessages(): Observable<UserMessage[]> {
    return this.http.get<UserMessage[]>(`http://localhost:8080/user/messages`);
  }
  delete(message: UserMessage) {
    return this.http.put(`http://localhost:8080/user/messages/delete`, message);
  }
}
