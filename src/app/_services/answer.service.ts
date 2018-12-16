import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import {AuthenticationService} from './authentication.service';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/from';
import {HttpClient} from '@angular/common/http';
import {Survey} from '../_models/Survey';
import {Answer, Question} from '../_models/question';
import {SurveyService} from './survey.service';

@Injectable()
export class AnswerService {

  constructor(private router: Router,
              private snackBar: MatSnackBar,
              private authService: AuthenticationService,
              private surveyService: SurveyService,
              private http: HttpClient) { }
  public saveAnswer(answer: Answer, questionId: number) {
    this.http.put(`http://localhost:8080/answers/` + questionId, answer );
  }

}