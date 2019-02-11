import { Component, OnInit } from '@angular/core';
import {SurveyResultService} from '../../_services/surveyResult.service';
import {SurveyResult} from '../../_models/SurveyResult';
import {User} from '../../_models';

@Component({
  selector: 'app-network-statistics',
  templateUrl: './network-statistics.component.html',
  styleUrls: ['./network-statistics.component.css']
})
export class NetworkStatisticsComponent implements OnInit {

  surveyResults: SurveyResult[] = [];
  childrenSurveyResults: SurveyResult[] = [];

  constructor(private surveyResultService: SurveyResultService ) { }

  ngOnInit() {
    // this.surveyResultService.getSurveyResultsOfAll().subscribe(result => this.surveyResults = result);
  }

  public showAllScoring(): any {
    return this.surveyResultService.getSurveyResultsOfAll().subscribe(result => this.surveyResults = result);
  }
  public showChildresScoring(user: User): any {
    return this.surveyResultService.getSurveyResultOfChildren(user).subscribe(result => {
      this.childrenSurveyResults = result});
  }

}
