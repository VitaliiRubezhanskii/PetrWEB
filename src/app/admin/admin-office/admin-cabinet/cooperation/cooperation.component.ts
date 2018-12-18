import { Component, OnInit } from '@angular/core';
import {CooperationMessageService} from '../../../../_services/cooperation-message.service';
import {CooperationMessage} from '../../../../_models/cooperationMessage';
import {QuestionnaireService} from '../../../../_services/questionnaire.service';
import {Survey} from '../../../../_models/Survey';
import {SurveyService} from '../../../../_services/survey.service';

@Component({
  selector: 'app-cooperation',
  templateUrl: './cooperation.component.html',
  styleUrls: ['./cooperation.component.css']
})
export class CooperationComponent implements OnInit {

  messages: CooperationMessage[] = [];

  public questionnaireList: Survey[];
  public showMine: Boolean = true;

  constructor(private messageService: CooperationMessageService,
              private surveyService: SurveyService,
              private questionnaireService: QuestionnaireService) { }

  ngOnInit() {
    this.messageService.getAllMessages().subscribe(result => {this.messages = result });
    this.surveyService.getList().subscribe(list => {this.questionnaireList = list; this.questionnaireList.forEach(x => console.log(x.name)) });
  }

  filterQuestionnaires(questionnaires: [any]) {
    // return this.showMine ? questionnaires.filter(q => q.submittedById === 'vitalii') : questionnaires;
    return this.showMine ? this.questionnaireList : '';
  }

}
