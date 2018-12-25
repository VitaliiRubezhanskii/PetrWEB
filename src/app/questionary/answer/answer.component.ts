import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {QuestionnaireService} from '../../_services/questionnaire.service';
import {ResponseService} from '../../_services/response.service';
import {Survey} from '../../_models/Survey';
import {Answer, Question, UserAnswer} from '../../_models/question';
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
    // public answers: Answer[] = [];
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

    showEvent(event, question: Question) {
      this.userAnswer = event;
      this.filtQuestion = question;
      this.filteredQ.question = this.filtQuestion;
      this.filteredQ.answers = question.answers.filter(a => a.id === this.userAnswer.answerValue)
      // this.filteredAnswers = this.filteredQ.answers.filter(a => a.id === this.userAnswer.answerValue);
      // this.filteredQ.answers = this.filteredAnswers;
      console.log(event);
      console.log(this.filteredQ);
      this.submit(this.filteredQ);
    }

    submit(questionDTO: any) {
      // questions.forEach(q => console.log(q));
      this.userService.getByUsername(localStorage.getItem('username')).subscribe(u => {
        this.user = u;
        console.log(this.user.email);
        this.users.push(u);
      });
      setTimeout(() => {
          questionDTO.answers.forEach(answer => {
            // answer.users = this.users;
            this.responseService.submit(answer, this.user.id).subscribe(r => {}); });
      }, 1500);
    }
}
