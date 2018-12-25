import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../../_models';
import {UserMessage} from '../../_models/userMessage';
import {UserService} from '../../_services';
import {UserMessageService} from '../../_services/user-message.service';
import {stripBom} from '@angular/cli/utilities/strip-bom';
import {stringDistance} from 'codelyzer/util/utils';
import {current} from 'codelyzer/util/syntaxKind';
import {Survey} from '../../_models/Survey';
import {SurveyService} from '../../_services/survey.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  messageToAdminForm: FormGroup;
  user: User = new User();
  message: UserMessage = new UserMessage();
  survey: Survey = new Survey();

  constructor(private modalService: BsModalService,
              private userService: UserService,
              private userMessageService: UserMessageService,
              private surveyService: SurveyService,
              private formBuilder: FormBuilder) {
    this.messageToAdminForm = this.formBuilder.group({message: ''});
  }

  ngOnInit() {
    this.userService.getByUsername(localStorage.getItem('username')).subscribe(result => {
      this.user = result;
    });

    this.surveyService.getSurveyById(103).subscribe(result => { this.survey = result; });
  }
  showForm(template: TemplateRef<any>) {
    this.modalService.show(template);
  }

  hideForm() {
    this.modalService.hide(1);
  }

  send() {
    this.message.text = this.messageToAdminForm.controls.message.value;
    this.message.user = this.user;
    this.userMessageService.send(this.message).subscribe(() => {
      this.messageToAdminForm.reset();
     this.hideForm();
    });
  }
}
