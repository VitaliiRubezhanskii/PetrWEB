import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../_models';
import {Observable} from 'rxjs';
import {SurveyResult} from '../_models/SurveyResult';
import {Answer} from '../_models/question';

@Injectable()
export class SurveyResultService {

  constructor(private http: HttpClient) {}


  public getSurveyResultOfUser(user: User): Observable<SurveyResult[]> {
    return this.http.get<SurveyResult[]>(`http://localhost:8080/scoring/user/` + user.id);
  }

  public getSurveyResultOfChildren(user: User): Observable<SurveyResult[]> {
    return this.http.get<SurveyResult[]>(`http://localhost:8080/scoring/users/` + user.id + `/children`);
  }

  public getSurveyResultsOfAll(): Observable<SurveyResult[]> {
    return this.http.get<SurveyResult[]>(`http://localhost:8080/scoring/users`);
  }
  public getUserSurveyResults(userId: number): Observable<SurveyResult[]> {
    return this.http.get<SurveyResult[]>(`http://localhost:8080/scoring/users/` + userId);
  }

  public findAnswersByUser(userId: number): Observable<Answer[]> {
    return this.http.get<Answer[]>(`http://localhost:8080/answers/user/` + userId);
  }

}
