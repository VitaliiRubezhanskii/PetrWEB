import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Answer, Question, UserAnswer} from '../../_models/question';
import {Survey} from '../../_models/Survey';
import {DialogsService} from '../../_services/dialogs.service';
import {QuestionnaireService} from '../../_services/questionnaire.service';
import {QuestionService} from '../../_services/question.service';
import {QuestionType} from '../enums/question-type.enum';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {User} from '../../_models';
import {UserService} from '../../_services';

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
  @Input() value: string;
  @Input() editableForUser: boolean;
  @Output() questionEvent = new EventEmitter();

  public answer: string;
  public answers: string;
  public checked: boolean[] = [false, false, false];
  public form: FormGroup;
  public userAnswer: UserAnswer = new UserAnswer();
  private currentUser: User = new User();

  constructor(private dialogsService: DialogsService,
              private userService: UserService,
              private questionnaireService: QuestionnaireService,
              private formBuilder: FormBuilder,
              public questionService: QuestionService) {
  }

  ngOnInit() {
    // this.userService.getByUsername(localStorage.getItem('username')).subscribe(u => this.currentUser = u);
    if (['BOOLEAN', 'MULTI_CHOICE_MULTI'].includes(this.question.type.toString())) {
      this.question.answers = this.question.answers.filter((q => !!q.value));
      console.log(this.question);

      this.form = this.formBuilder.group({
        answer: this.formBuilder.array([{}]),
      });
    }
  }

  // hasRole(role: string): boolean {
  //   if (this.currentUser.roles.filter(r => r.name === role).length > 0) {
  //     return true;
  //   }
  //   return false;
  // }

  changeDetector(questionText: number, value: number ) {
    this.userAnswer.questionText = questionText;
    this.userAnswer.answerValue = value;
      this.questionEvent.emit(this.userAnswer);
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
