import { Component, OnInit, Input } from '@angular/core';

import { Question } from '../../_models/question';
import {DialogsService} from '../../_services/dialogs.service';
import {QuestionnaireService} from '../../_services/questionnaire.service';
import {QuestionService} from '../../_services/question.service';
import {Survey} from '../../_models/Survey';



@Component({
    selector: 'question-type',
    templateUrl: './question-type.component.html',
    styleUrls: ['./question-type.component.less']
})

export class QuestionTypeComponent implements OnInit {

    @Input() questionnaireId: any;
    @Input() question: Question;
    @Input() qId: any;
    @Input() readonly: boolean;
    @Input() edit: boolean;
    @Input() survey: Survey;
    public answer: string;

    constructor(private dialogsService: DialogsService,
                private questionnaireService: QuestionnaireService,
                public questionService: QuestionService) { }

    ngOnInit() {
        if (['BOOLEAN', 'MULTI_CHOICE_MULTI'].includes(this.question.type.toString())) {
            this.question.values = this.question.values.filter((q => !!q.value));
        }
      // if (['BOOLEAN', 'MULTI_CHOICE_MULTI'].includes(this.question.type.toString())) {
      //   this.survey.question.values = this.question.values.filter((q => !!q.value));
      // }
    }

    editQuestion(event) {
        event.preventDefault();

        this.questionService.editQuestion(this.question).subscribe(result => {
            if (result) {
                Object.assign(this.question, result);
                this.questionnaireService.udateQuestion(this.questionnaireId, this.qId, this.question);
            }
        });
    }

    removeQuestion(event, questionId) {
        event.preventDefault();
        this.dialogsService
            .confirm('Confirm Delete', 'Are you sure you want delete question?')
            .subscribe(res => res && this.questionnaireService.removeQuestion(questionId).subscribe(e=>{}));
    }
}