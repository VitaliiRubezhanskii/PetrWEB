import { Component, OnInit, ViewEncapsulation } from '@angular/core';




import {ResponseService} from '../../_services/response.service';
import {DialogsService} from '../../_services/dialogs.service';
import {AuthenticationService} from '../../_services';
import {SurveyService} from '../../_services/survey.service';

@Component({
    selector: 'app-response',
    templateUrl: './response.component.html',
    styleUrls: ['./response.component.less'],
    encapsulation: ViewEncapsulation.None
})

export class ResponseComponent implements OnInit {

    public responseList: any;

    constructor(private responseService: ResponseService,
                private authService: AuthenticationService,
                private surveyService: SurveyService,
                private dialogsService: DialogsService) { }

    ngOnInit() {
        this.responseList = this.surveyService.getList();
    }

    remove(id) {
        this.dialogsService
            .confirm('Confirm Delete', 'Are you sure you want delete question?')
            .subscribe(res => res && this.responseService.remove(id));
    }

    userResponses(responses: [any]) {
        return responses.filter(q => q.submittedById === 'vitalii');
    }

}
