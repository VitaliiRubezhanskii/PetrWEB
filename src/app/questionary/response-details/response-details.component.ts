import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {SurveyService} from '../../_services/survey.service';
import {Survey} from '../../_models/Survey';

@Component({
    selector: 'app-response-details',
    templateUrl: './response-details.component.html',
    styleUrls: ['./response-details.component.less']
})

export class ResponseDetailsComponent implements OnInit {
    public survey: Survey = new Survey;
    public responseQiestionsList: Observable<any[]>;

    private subRoter: any;

    constructor( private route: ActivatedRoute,
                 private router: Router,
                 private surveyService: SurveyService) { }

    ngOnInit() {


        this.subRoter = this.route.params.subscribe(params => {
            const id = params['id'];
          this.surveyService.getSurveyById(id).subscribe(result => { this.survey = result; });
        }
        );
        //     this.db
        //         .object(`responses/${id}`)
        //         .valueChanges()
        //         .subscribe(response => this.questionnaire = response);
        //     this.responseQiestionsList = this.db.list(`responses/${id}/questions`).valueChanges();
        // });
    }
}
