import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models';

@Injectable()
export class UploadFileService {
  constructor(private http: HttpClient) {}

  saveFiles(total_form, user: User) {
    return this.http.post('http://localhost:8080/users/user/' + user.id + '/document', total_form);

  }

  getFile(user: User, type: string) {
    return this.http.get('http://localhost:8080/users/user/' + user.id + '/document/' + type);
  }
}
