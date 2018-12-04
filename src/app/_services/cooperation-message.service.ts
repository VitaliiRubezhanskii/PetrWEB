import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {CooperationMessage} from '../_models/cooperationMessage';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CooperationMessageService {
  constructor(private http: HttpClient) {}

  send(message: CooperationMessage) {
    return this.http.post(`http://localhost:8080/cooperation/send`, message, httpOptions);
  }
  getAllMessages(): Observable<CooperationMessage[]> {
    return this.http.get<CooperationMessage[]>(`http://localhost:8080/cooperation/messages`);
  }


}
