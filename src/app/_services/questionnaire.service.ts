
import {from as observableFrom,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import {AuthenticationService} from './authentication.service';

import {HttpClient} from '@angular/common/http';
import {Survey} from '../_models/Survey';
import {Question} from '../_models/question';
import {SurveyService} from './survey.service';
import {AnswerDto} from '../_models/answerDto';
import {createQuery} from '@angular/core/src/view/query';

@Injectable()
export class QuestionnaireService {

    private baseUrl = 'questionnaires';
    private responseQ: Question[] = [];
    private survey: Survey = new Survey();
    private savedSurvey: Survey = new Survey();
    private surveyId: number;
    private questionId: number;
    private answer: AnswerDto = new AnswerDto();

    constructor(private router: Router,
                private snackBar: MatSnackBar,
                private authService: AuthenticationService,
                private surveyService: SurveyService,
                private http: HttpClient) { }


        // return this.db.list(this.baseUrl).snapshotChanges().map(actions => {
        //     return actions.map((a: any) => {
        //         const id = a.payload.key;
        //         return { id, ...a.payload.val() };
        //     });
        // });
    // }

    public get(questionnaireId) {
        // return this.db.object(this.baseUrl + `/${questionnaireId}`).valueChanges();
    }

    public create(name, questions: Question[], count): Observable<Object> {
        this.survey.name = name;
        this.survey.date = new Date().toString();
        this.survey.count = count;
        this.survey.questions = questions;
       this.surveyService.save(this.survey).subscribe(result => {
         this.surveyId = result;
        });

        setTimeout(() => { questions.forEach(q => {
         this.createQuestion(this.surveyId, q);
        });
        }, 1500);
       return observableFrom(this.responseQ);

    }

    public udapte(questionnaireId) {
        // this.db.object(this.baseUrl + `/${questionnaireId}`).update({ date: new Date() });
    }

    public createQuestion(surveyId: number, question: Question) {
      this.http.put<number>(`http://localhost:8080/questions/` + surveyId, question).subscribe(e => {
        this.questionId = e;
        if ( question.values.length !== 0 ) {
          question.values.forEach(value => {
            this.answer = value;
            this.http.put<number>(`http://localhost:8080/answers/` + this.questionId , this.answer).subscribe(el => { });
          });
        } else {
          console.log(question.values.length + 'values length')
          question.answers.forEach(value => {
            this.answer = value;
            this.http.put<number>(`http://localhost:8080/answers/` + this.questionId, this.answer).subscribe(el => {
            });
          });
        }
      });
    }

    public remove(questionnaireId) {
        this.http.delete(`http://localhost:8080/questions/`);
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

    public removeQuestion(questionId): Observable<any> {
      return this.http.delete<any>(`http://localhost:8080/questions/delete/question/` + questionId);
    }
}
