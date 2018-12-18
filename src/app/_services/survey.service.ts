import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Survey} from '../_models/Survey';
import {Question} from '../_models/question';

@Injectable()
export class SurveyService {

  constructor(private router: Router,
              private snackBar: MatSnackBar,
              private authService: AuthenticationService,
              private http: HttpClient) { }
  public save(survey: Survey): Observable<number> {
    return this.http.post<number>(`http://localhost:8080/surveys/new`, survey);
  }
  public getList(): Observable<Survey[]> {
    return this.http.get<Survey[]>(`http://localhost:8080/surveys`);
}

  public getSurveyById(surveyId): Observable<Survey> {
    return this.http.get<Survey>(`http://localhost:8080/surveys/survey/` + surveyId);
  }
  // public deleteSurveyById(surveyId): Observable<Survey> {
  //
  //   return this.http.delete<>
  //
  // }

}
