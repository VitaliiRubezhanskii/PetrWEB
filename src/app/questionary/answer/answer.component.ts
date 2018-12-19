import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {QuestionnaireService} from '../../_services/questionnaire.service';
import {ResponseService} from '../../_services/response.service';
import {Survey} from '../../_models/Survey';
import {Question} from '../../_models/question';
import {SurveyService} from '../../_services/survey.service';
import {User} from '../../_models';
import {UserService} from '../../_services';



@Component({
    selector: 'app-answer',
    templateUrl: './answer.component.html',
    styleUrls: ['./answer.component.less']
})
export class AnswerComponent implements OnInit {

    public questions: Question[] = [];
    public survey: Survey = new Survey() ;
    private subRoter: any;
    private user: User = new User();
    private users: User[] = [];
    constructor(private route: ActivatedRoute,
                private questionnaireService: QuestionnaireService,
                private surveyService: SurveyService,
                private userService: UserService,
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

    submit(questions: Question[]) {
      questions.forEach(q => console.log(q));
      this.userService.getByUsername(localStorage.getItem('username')).subscribe(u => {
        this.user = u;
        console.log(this.user.email);
        this.users.push(u);
      });
      setTimeout(() => {
        questions.forEach(question => {
          question.answers.forEach(answer => {
            // answer.users = this.users;
            this.responseService.submit(answer, this.user.id).subscribe(r => {}); });
        });
      }, 1500);
    }
}
