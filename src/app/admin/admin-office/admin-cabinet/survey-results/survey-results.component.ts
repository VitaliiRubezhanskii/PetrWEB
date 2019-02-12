import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SurveyResultService} from '../../../../_services/surveyResult.service';
import {UserService} from '../../../../_services';
import {User} from '../../../../_models';
import {SurveyResult} from '../../../../_models/SurveyResult';
import {Answer, Question} from '../../../../_models/question';

@Component({
  selector: 'app-survey-results',
  templateUrl: './survey-results.component.html',
  styleUrls: ['./survey-results.component.css']
})
export class SurveyResultsComponent implements OnInit {

  user: User = new User();
  answers: Answer[] = [];
  surveyResults: SurveyResult[];
  constructor(private http: HttpClient,
              private surveyResultService: SurveyResultService,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.getByUsername(localStorage.getItem('username')).subscribe(result => {
      this.user = result;
    });
  }

  public findAnswers(userId: number): any {
     this.surveyResultService.findAnswersByUser(userId).subscribe(data => {
              this.answers = data;
              console.log(this.answers);
              });
     return this.answers;
  }

  public answerSeparator(question: Question) {
   return this.answers.filter(a => question.answers.includes(a));

  }

  public getSurveyResults() {
    this.surveyResultService.getSurveyResultsOfAll().subscribe(r => {
      this.surveyResults = r;
    });
  }
}
