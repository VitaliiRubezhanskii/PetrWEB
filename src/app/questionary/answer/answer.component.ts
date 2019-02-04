import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {QuestionnaireService} from '../../_services/questionnaire.service';
import {ResponseService} from '../../_services/response.service';
import {Survey} from '../../_models/Survey';
import { Question, UserAnswer } from '../../_models/question';
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
    public userAnswer: UserAnswer = new UserAnswer();
    public filtQuestion: Question;
    public filteredQ = {question: {}, answers: [{}]};
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
      this.userService.getByUsername(localStorage.getItem('username')).subscribe(u => {
        this.user = u;
      });
    }

    showEvent(event, question: Question) {
      console.log(this.survey);
      this.userAnswer = event;
      this.filtQuestion = question;
      this.filteredQ.question = this.filtQuestion;
      this.filteredQ.answers = question.answers.filter(a => a.id === this.userAnswer.answerValue)
      console.log(event);
      this.submit(this.userAnswer.answerValue);
    }

    submit(answer: number) {
            this.responseService.submit(answer, this.user.id).subscribe(r => {});
    }

    submitSurvey(survey: Survey) {
      this.responseService.submitSurvey(survey, this.user.id).subscribe(res => {});
    }
}
