import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../_models/question';
import {Survey} from '../../_models/Survey';
import {DialogsService} from '../../_services/dialogs.service';
import {QuestionnaireService} from '../../_services/questionnaire.service';
import {QuestionService} from '../../_services/question.service';

@Component({
  selector: 'app-questions-by-type',
  templateUrl: './questions-by-type.component.html',
  styleUrls: ['./questions-by-type.component.css']
})
export class QuestionsByTypeComponent implements OnInit {

  @Input() surveyId: any;
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
      this.question.answers = this.question.answers.filter((q => !!q.value));
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
        this.questionnaireService.udateQuestion(this.surveyId, this.qId, this.question);
      }
    });
  }

  removeQuestion(event, questionaryId) {
    event.preventDefault();
    console.log(questionaryId)
    this.dialogsService
      .confirm('Confirm Delete', 'Are you sure you want delete question?')
      .subscribe(res => res && this.questionnaireService.removeQuestion(questionaryId).subscribe(e=>{}));
  }
}
