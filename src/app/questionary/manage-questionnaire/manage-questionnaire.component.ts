import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';



import { Observable } from 'rxjs';
import {QuestionService} from '../../_services/question.service';
import {QuestionnaireService} from '../../_services/questionnaire.service';
import {Survey} from '../../_models/Survey';
import {SurveyService} from '../../_services/survey.service';
import {Question} from '../../_models/question';


@Component({
    selector: 'app-manage-questionnaire',
    templateUrl: './manage-questionnaire.component.html',
    styleUrls: ['./manage-questionnaire.component.less']
})

export class ManageQuestionnaireComponent implements OnInit, OnDestroy {
    public survey: Survey = new Survey();
    public questions: Question[] = [];
    public questionnaire: Observable<any[]>;
    public question: Question = new Question('', '', '');
    public questionnaireId: number;

    private subRoter: any;
    private questionsRef: any;

    constructor(private route: ActivatedRoute,
                private questionService: QuestionService,
                private surveyService: SurveyService,
                private questionnaireService: QuestionnaireService) { }

    ngOnInit() {

        this.subRoter = this.route.params.subscribe(params => {
            this.questionnaireId = params['id'];

            // this.questionnaireService
            //     .get(this.questionnaireId)
            //     .subscribe(response => {
            //         this.questionnaire = response;
            //     });
       this.surveyService.getSurveyById(this.questionnaireId).subscribe(result => { this.survey = result; });
            // this.questionsRef = this.questionnaireService.getQuestionFireList(this.questionnaireId);

            // this.questions = this.questionsRef.snapshotChanges().map(actions => {
            //     return actions.map((a: any) => {
            //         const id = a.payload.key;
            //         return { id, ...a.payload.val() };
            //     });
            // });
        });
    }

    ngOnDestroy() {
        this.subRoter.unsubscribe();
    }

     addQuestion() {
        this.questionService
           .addQuestion()
           .subscribe(result => {
            this.question.text = result.text;
            this.question.type = result.type;
            this.question.answers = result.values;
            this.survey.questions.push(this.question); console.log(this.question);
            this.save(this.questionnaireId);
          });
  }

  save(qID: number) {
      console.log(qID + 'qId')
      console.log(this.survey.questions);
    this.survey.questions.forEach(q => {
      this.questionnaireService
      .createQuestion(qID, q);
    });
  }
}
