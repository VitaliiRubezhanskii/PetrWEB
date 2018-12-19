import { Component, OnInit } from '@angular/core';
import {QuestionnaireService} from '../../_services/questionnaire.service';
import {DialogsService} from '../../_services/dialogs.service';
import {AuthenticationService} from '../../_services';
import {Survey} from '../../_models/Survey';
import {SurveyService} from '../../_services/survey.service';

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.less']
})

export class ManageComponent implements OnInit {

    public questionnaireList: Survey[];

    constructor(
        private questionnaireService: QuestionnaireService,
        private dialogsService: DialogsService,
        private surveyService: SurveyService,
        private authService: AuthenticationService) {}

    ngOnInit() {
         this.surveyService.getList().subscribe(result => {
           this.questionnaireList = result;
           this.questionnaireList.forEach(q => {console.log(q.questions)})
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
}
