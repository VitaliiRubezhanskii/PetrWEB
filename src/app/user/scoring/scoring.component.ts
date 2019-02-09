import { Component, OnInit } from '@angular/core';
import {UserService} from '../../_services';
import {User} from '../../_models';
import {SurveyResult} from '../../_models/SurveyResult';
import {SurveyResultService} from '../../_services/surveyResult.service';

@Component({
  selector: 'app-scoring',
  templateUrl: './scoring.component.html',
  styleUrls: ['./scoring.component.css']
})
export class ScoringComponent implements OnInit {

  currentUser = true;
  user: User = new User();
  surveyResults: SurveyResult[] = [];
  childrenSurveyResults: SurveyResult[] = [];

  constructor(private userService: UserService,
              private surveyResultService: SurveyResultService) { }

  ngOnInit() {
    this.userService.getByUsername(localStorage.getItem('username')).subscribe(result => {
      this.user = result;
    });
  }

  public showOwnScoring(): any {
    this.currentUser = true;
    return this.surveyResultService.getSurveyResultOfUser(this.user).subscribe(result => {this.surveyResults = result});

  }

  public showChildresScoring(): any {
    this.currentUser = false
    return this.surveyResultService.getSurveyResultOfChildren(this.user).subscribe(result => {
      this.childrenSurveyResults = result});
  }

}
