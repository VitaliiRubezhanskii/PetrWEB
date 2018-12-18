import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {QuestionnaireService} from '../../_services/questionnaire.service';
import {ResponseService} from '../../_services/response.service';
import {Survey} from '../../_models/Survey';
import {Question} from '../../_models/question';
import {SurveyService} from '../../_services/survey.service';



@Component({
    selector: 'app-answer',
    templateUrl: './answer.component.html',
    styleUrls: ['./answer.component.less']
})

export class AnswerComponent implements OnInit {

    public questions: Question[] = [];
    public survey: Survey = new Survey() ;
    private subRoter: any;

    constructor(private route: ActivatedRoute,
                private questionnaireService: QuestionnaireService,
                private surveyService: SurveyService,
                private responseService: ResponseService) { }

    ngOnInit() {
        this.subRoter = this.route.params.subscribe(params => {
            const id = params['id'];
            this.surveyService
                .getSurveyById(id)
                .subscribe(response => this.survey = response);
            console.log(this.survey.questions);
      this.questions = this.survey.questions;

    });
    }
    //
    // ngOnDestroy() {
    //     this.subRoter.unsubscribe();
    // }

    submit(survey) {
        this.responseService.submit(this.survey.name, this.survey.questions);
    }

}
