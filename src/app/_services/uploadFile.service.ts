import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../_models';


@Injectable()
export class UploadFileService {
  // p: string[] = [];
  constructor(private http: HttpClient) {}

  pushFileToStorage(file: File[],  user: User): Observable<HttpEvent<{}>> {
    console.log('Hello from pushFileToStorage method');
    const formdata: FormData = new FormData();


    formdata.append('file', JSON.stringify(file));
    const req = new HttpRequest('PATCH', 'http://localhost:8080/users/user/' + user.id + '/document/' + user.id, formdata);
    return this.http.request(req);
  }

  getFiles(): Observable<string[]> {
    return this.http.get<string[]>('/getallfiles');
  }
}
