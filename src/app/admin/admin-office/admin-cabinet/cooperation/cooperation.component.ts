import { Component, OnInit } from '@angular/core';
import {CooperationMessageService} from '../../../../_services/cooperation-message.service';
import {CooperationMessage} from '../../../../_models/cooperationMessage';
import {QuestionnaireService} from '../../../../_services/questionnaire.service';
import {Survey} from '../../../../_models/Survey';
import {SurveyService} from '../../../../_services/survey.service';
import {UserService} from '../../../../_services';
import {User} from '../../../../_models';

@Component({
  selector: 'app-cooperation',
  templateUrl: './cooperation.component.html',
  styleUrls: ['./cooperation.component.css']
})
export class CooperationComponent implements OnInit {

  messages: CooperationMessage[] = [];
  private currentUser: User = new User();

  public questionnaireList: Survey[];
  public showMine: Boolean = true;

  constructor(private messageService: CooperationMessageService,
              private surveyService: SurveyService,
              private userService: UserService,
              private questionnaireService: QuestionnaireService) { }

  ngOnInit() {
    this.userService.getByUsername(localStorage.getItem('username')).subscribe(u => {
      this.currentUser = u;
    });
    this.messageService.getAllMessages().subscribe(result => {this.messages = result} );
    this.surveyService.getList().subscribe(list => {this.questionnaireList = list;
    this.questionnaireList.forEach(x => console.log(x.name))});
  }

  public sendResponse(isApproved: boolean) {
      this.messageService.sendResponse(this.currentUser.email, isApproved).subscribe(() => {});
  }
}
