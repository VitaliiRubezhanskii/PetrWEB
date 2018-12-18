import { Component, OnInit } from '@angular/core';
import {UserMessageService} from '../../../../_services/user-message.service';
import {UserMessage} from '../../../../_models/userMessage';
import {removeSummaryDuplicates} from '@angular/compiler';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {


  messages: UserMessage[];
  constructor(private userMessageService: UserMessageService) { }

  ngOnInit() {
  this.userMessageService.getAllMessages().subscribe(result => {this.messages = result});
  }

}
