import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Survey} from '../_models/Survey';
import {Question} from '../_models/question';

@Injectable()
export class QuestionnaireService {

    private baseUrl = 'questionnaires';

    constructor(private router: Router,
                private snackBar: MatSnackBar,
                private authService: AuthenticationService,
                private http: HttpClient) { }

    public getList(): Observable<Survey[]> {
        return this.http.get<Survey[]>(`http://localhost:8080/surveys`);
        // return this.db.list(this.baseUrl).snapshotChanges().map(actions => {
        //     return actions.map((a: any) => {
        //         const id = a.payload.key;
        //         return { id, ...a.payload.val() };
        //     });
        // });
    }

    public get(questionnaireId) {
        // return this.db.object(this.baseUrl + `/${questionnaireId}`).valueChanges();
    }

    public create(name, questions: Question[], count): Observable<any> {

        const payload = {
            date: new Date().toString(),
            name,
            count,
          questions: questions
        };
        console.log(questions)
        return this.http.post(`http://localhost:8080/surveys/new`, payload);



        // this.db.list(this.baseUrl).push(playload).then(() => {
        //     this.snackBar.open('New Questionnaire has been created', '', {
        //         duration: 2000,
        //     }).afterDismissed().subscribe(() => {
        //         this.router.navigate(['/']);
        //     });
        // });
    }
  public getSurveyById(surveyId): Observable<Survey> {
    return this.http.get<Survey>(`http://localhost:8080/surveys/survey/` + surveyId);
  }

    public udapte(questionnaireId) {
        // this.db.object(this.baseUrl + `/${questionnaireId}`).update({ date: new Date() });
    }

    public remove(questionnaireId) {
        // this.db.object(this.baseUrl + `/${questionnaireId}`).remove();
    }

    public getQuestionFireList(questionnaireId) {
        // return this.db.list(this.baseUrl + `/${questionnaireId}/questions`);
    }

    public getQuestionList(questionnaireId) {
        // return this.getQuestionFireList(questionnaireId)
        //     .snapshotChanges().map(actions => {
        //         return actions.map((a: any) => {
        //             const id = a.payload.key;
        //             return { id, ...a.payload.val() };
        //         });
        //     });
    }

    public udateQuestion(questionnaireId, qId, question) {
        // this.db.object(this.baseUrl + `/${questionnaireId}/questions/${qId}`)
        //     .update(question).then(_ => this.udapte(questionnaireId));
    }

    public removeQuestion(questionnaireId, qId) {
        // this.db.object(this.baseUrl + `/${questionnaireId}/questions/${qId}`).remove();
    }
}
