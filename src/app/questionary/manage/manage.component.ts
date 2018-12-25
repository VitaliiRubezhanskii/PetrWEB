import {Component, Input, OnInit} from '@angular/core';
import {QuestionnaireService} from '../../_services/questionnaire.service';
import {DialogsService} from '../../_services/dialogs.service';
import {AuthenticationService, UserService} from '../../_services';
import {Survey} from '../../_models/Survey';
import {SurveyService} from '../../_services/survey.service';
import {User} from '../../_models';

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.less']
})

export class ManageComponent implements OnInit {

    public questionnaireList: Survey[];
    public currentUser: User;
    public editableForUser = false;
    @Input() public surveys: Survey [];
    @Input() public userRole: string;
    constructor(
        private questionnaireService: QuestionnaireService,
        private dialogsService: DialogsService,
        private surveyService: SurveyService,
        private userService: UserService) {}

    ngOnInit() {
      this.userService.getByUsername(localStorage.getItem('username')).subscribe(u => {this.currentUser = u; });
         this.surveyService.getList().subscribe(result => {
           this.questionnaireList = result;
           this.questionnaireList.forEach(q => {console.log(q.questions); });
         });
    }

    remove(id) {
        this.dialogsService
            .confirm('Confirm Delete', 'Are you sure you want delete question?')
            .subscribe(res => res && this.questionnaireService.remove(id));
    }

    userQuestionnaires(questionnaires: [any]) {
        return questionnaires.filter(q => q.submittedById === 'vitalii');
    }

    hasRole(role: string): boolean {
      if (this.currentUser.roles.filter(r => r.name === role).length > 0) {
        return true;
      }
      return false;
    }
}
