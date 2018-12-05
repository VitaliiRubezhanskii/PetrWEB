import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../_models';

@Injectable()
export class UploadFileService {
  constructor(private http: HttpClient) {}

  pushFileToStorage(file: File, documentsType: string, user: User): Observable<HttpEvent<{}>> {
    console.log('Hello from pushFileToStorage method');
    let formdata: FormData = new FormData();

    formdata.append('file', file);
    const req = new HttpRequest('PATCH', 'http://localhost:8080/users/user/' + user.id + '/document/' + documentsType, formdata);


//   {
//   reportProgress: true,
//   responseType: 'text'
// }

    return this.http.request(req);
  }

  getFiles(): Observable<string[]> {
    return this.http.get<string[]>('/getallfiles');
  }
}
