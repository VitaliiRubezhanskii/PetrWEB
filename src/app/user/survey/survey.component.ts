import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../_models';
import {UserMessage} from '../../_models/userMessage';
import {UserService} from '../../_services';
import {UserMessageService} from '../../_services/user-message.service';
import {stripBom} from '@angular/cli/utilities/strip-bom';
import {stringDistance} from 'codelyzer/util/utils';
import {current} from 'codelyzer/util/syntaxKind';
import {Survey} from '../../_models/Survey';
import {SurveyService} from '../../_services/survey.service';
import {MatDatepickerInputEvent} from '@angular/material/typings/esm5/datepicker';
import {UserCreateDto} from '../../_models/UserCreateDto';
import {Address} from '../../_models/address';
import {UploadFileService} from '../../_services/uploadFile.service';
import {DateAdapter} from '@angular/material';
import {Bank} from '../../_models/bank';
import {BankService} from '../../_services/bank.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  messageToAdminForm: FormGroup;
  user: User = new User();
  message: UserMessage = new UserMessage();
  survey: Survey[] = [];
  birthDatePicked: string;
  registerForm: FormGroup;
  newUser: UserCreateDto = new UserCreateDto();
  address: Address = new Address();
  loading = false;
  myFiles: File[] = [];
  files: FileList[] = [];
  @ViewChild('register')
  private registerRef: TemplateRef<any>;
  selectedFiles: FileList;
  loginForm: FormGroup;
  messageForm: FormGroup;
  banks: Bank[];

  constructor(private modalService: BsModalService,
              private userService: UserService,
              private uploadService: UploadFileService,
              private userMessageService: UserMessageService,
              private surveyService: SurveyService,
              private bankService: BankService,
              private dateAdapter: DateAdapter<any>,
              private formBuilder: FormBuilder) {
    this.messageToAdminForm = this.formBuilder.group({message: ''});
  }

  ngOnInit() {
    this.dateAdapter.setLocale('ru');
    this.userService.getByUsername(localStorage.getItem('username')).subscribe(result => {
      this.user = result;
    });

    this.surveyService.getSurveysForUser(this.user).subscribe(result => { this.survey = result; });
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.messageForm = this.formBuilder.group({senderName: '', email: '', subject: '', phone: '', comment: ''});
    this.bankService.getAllBanks().subscribe(data => { this.banks = data; });
    this.registerForm = this.formBuilder.group({
      name: '', middleName: '', surname: '', username: '', password: '', email: '', oblast: '', city: '',
      street: '', buildingNum: '', apartmentNum: '', phone: '', card: '', inn: '', passport: '', issuedBy: '', issuedWhen: '',
      bank: '', gender: '', birthDay: ''
    });
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

  addEvent(event: MatDatepickerInputEvent<Date>) {
    // this.events.push(`${type}: ${event.value.getDate()}
    // .${event.value.getMonth() + 1}
    // .${event.value.getFullYear()}`);

    let day = event.value.getDate().toString();
    let month = event.value.getMonth().toString();
    const year = event.value.getFullYear().toString();
    if (month.length === 1) {
      month = `0` + `${event.value.getMonth() + 1}`;
    }
    if (day.length === 1) {
      day = `0` + `${event.value.getMonth()}`;
    }
    console.log(day + `.` + month + `.` + year);
    this.birthDatePicked = day + `.` + month + `.` + year;

  }

  onRegister() {
    this.newUser = new UserCreateDto();
    this.address = new Address();
    // this.loading = true;
    this.newUser.name = this.registerForm.controls.name.value;
    this.newUser.birthDate = this.birthDatePicked;
    this.newUser.surname = this.registerForm.controls.surname.value;
    this.newUser.middleName = this.registerForm.controls.middleName.value;
    this.newUser.username = this.registerForm.controls.username.value;
    this.newUser.email = this.registerForm.controls.email.value;
    this.address.oblast = this.registerForm.controls.oblast.value;
    this.address.city = this.registerForm.controls.city.value;
    this.address.street = this.registerForm.controls.street.value;
    this.address.buildingNum = this.registerForm.controls.buildingNum.value;
    this.address.apartmentNum = this.registerForm.controls.apartmentNum.value;
    this.newUser.inn = this.registerForm.controls.inn.value;
    this.newUser.passport = this.registerForm.controls.passport.value;
    this.newUser.card = this.registerForm.controls.card.value;
    this.newUser.phone = this.registerForm.controls.phone.value;
    this.newUser.password = this.registerForm.controls.password.value;
    this.newUser.bank = this.registerForm.controls.bank.value;
    this.newUser.address = this.address;
    this.userService.createUser(this.newUser).subscribe(() => {

      this.userService.getByUsername(this.newUser.username).subscribe((result: User) => {
        console.log(result);
        this.upload(result);
      });
    });
    this.hideForm();
  }

  upload(user: User) {
    this.files.forEach(f => { this.myFiles.push(f.item(0)); console.log(f.item(0).name); });
    const frmData = new FormData();
    console.log('Hello from upload documents method')
    for (var i = 0; i < this.myFiles.length; i++) {
      frmData.append(this.myFiles[i].name, this.myFiles[i]);
    }
    this.uploadService.saveFiles(frmData, user).subscribe(data => {
      console.log("result is ", data);
    });
    this.selectedFiles = undefined;
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.files.push(this.selectedFiles);
  }
}
