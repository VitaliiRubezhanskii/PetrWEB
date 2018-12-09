import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../_models';

@Injectable()
export class UploadFileService {
  constructor(private http: HttpClient) {}

  getFiles(): Observable<string[]> {
    return this.http.get<string[]>('/getallfiles');
  }

  saveFiles(total_form, user: User) {
    // let httpHeaders = new HttpHeaders({'Content-Type': 'multipart/form-data' });
    // let options = {headers: httpHeaders};
    return this.http.post('http://localhost:8080/users/user/' + user.id + '/document', total_form);

  }

  getFile(user: User) {
    // let httpHeaders = new HttpHeaders({'Content-Type': 'multipart/form-data' });
    // let options = {headers: httpHeaders};
    return this.http.get('http://localhost:8080/users/user/' + user.id + '/document');
  }
}
