import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../_models';
import {Observable} from 'rxjs';
import {SurveyResult} from '../_models/SurveyResult';

@Injectable()
export class SurveyResultService {

  constructor(private http: HttpClient) {}


  public getSurveyResultOfUser(user: User): Observable<SurveyResult[]> {
    return this.http.get<SurveyResult[]>(`http://localhost:8080/scoring/user/` + user.id);
  }

  public getSurveyResultOfChildren(user: User): Observable<SurveyResult[]> {
    return this.http.get<SurveyResult[]>(`http://localhost:8080/scoring/users/` + user.id + `/children`);
  }

  public getSurveyResultsOfAll(): Observable<any>{
    return this.http.get(`http://localhost:8080/scoring/results/all`);
  }

}
