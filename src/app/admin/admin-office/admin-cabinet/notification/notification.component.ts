import {Component, OnInit, TemplateRef} from '@angular/core';
import {UserMessageService} from '../../../../_services/user-message.service';
import {UserMessage} from '../../../../_models/userMessage';
import {removeSummaryDuplicates} from '@angular/compiler';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BsModalService} from 'ngx-bootstrap';
import {User} from '../../../../_models';
import {UserService} from '../../../../_services';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {


  messages: UserMessage[];
  messageToUser: FormGroup;
  user: User = new User();
  messageForm: FormGroup;
  message: UserMessage = new UserMessage();
  constructor(private userMessageService: UserMessageService,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private modalService: BsModalService) {
    this.messageToUser = this.formBuilder.group({message: ''});
  }

  ngOnInit() {
    this.userService.getByUsername(localStorage.getItem('username')).subscribe(result => {
      this.user = result;
    });
  this.userMessageService.getAllMessages().subscribe(result => {
    if (this.user.roles.filter(role => role.name === 'ADMIN').length > 0) {
      this.messages = result.filter(userMess => userMess.user.roles.filter(role => role.name === 'USER').length > 0);
    } else {
      this.messages = result.filter(userMess => userMess.user.roles.filter(role => role.name === 'ADMIN').length > 0);
    }
  });
    this.messageForm = this.formBuilder.group({senderName: '', email: '', subject: '', phone: '', comment: ''});
  }

  send() {
    this.message.text = this.messageToUser.controls.message.value;
    this.message.user = this.user;
    this.userMessageService.send(this.message).subscribe(() => {
      this.messageToUser.reset();
      this.hideForm();
    });
  }

  delete(message: UserMessage) {
    this.userMessageService.delete(message).subscribe(() => {});
  }

  hideForm() {
    this.modalService.hide(1);
  }

  showForm(template: TemplateRef<any>) {
    this.modalService.show(template);
  }

  hasRole(role: string): string {
    if (this.user.roles.filter(r => r.name === role).length > 0) {
      return 'пользователей';
    }
    return 'администратора';
  }


}
