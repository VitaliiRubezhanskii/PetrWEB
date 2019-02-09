import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { first } from 'rxjs/operators';


import {AuthenticationService, UserService} from '../_services';
import { BsModalService, BsModalRef} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Role, User} from '../_models';
import {UserCreateDto} from "../_models/UserCreateDto";
import {Address} from "../_models/address";
import {Bank} from '../_models/bank';
import {BankService} from '../_services/bank.service';
import {CooperationMessage} from '../_models/cooperationMessage';
import {CooperationMessageService} from '../_services/cooperation-message.service';
import {UploadFileService} from '../_services/uploadFile.service';
import {DateAdapter} from '@angular/material';
import {MatDatepickerInputEvent} from '@angular/material/typings/esm5/datepicker';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  projectLogo = 'budweiser.jpg';
  contactPerson = 'budweiser.jpg';
  @ViewChild('register')
  private registerRef: TemplateRef<any>;
  currentUser: User;
  users: User[] = [];
  newUser: UserCreateDto = new UserCreateDto();
  address: Address = new Address();
  bank: Bank = new Bank();
  banks: Bank[];
  modalRef: BsModalRef;
  loginForm: FormGroup;
  messageForm: FormGroup;
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  user: User;
  username: string;
  message: CooperationMessage = new CooperationMessage();
  selectedFiles: FileList;
  progress: { percentage: number } = { percentage: 0 };
  file: File;
  myFiles: File[] = [];
  files: FileList[] = [];
  gender = ['Мужской', 'Женский'];
  startDate = new Date();
  myDate = new Date();
  events: string[] = [];
  birthDatePicked: string;

  constructor(
                private userService: UserService,
                private bankService: BankService,
                private messageService: CooperationMessageService,
                private modalService: BsModalService,
                private authenticationService: AuthenticationService,
                private formBuilder: FormBuilder,
                private uploadService: UploadFileService,
                private route: ActivatedRoute,
                private router: Router,
                private dateAdapter: DateAdapter<any>
                ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
    console.log(this.myDate);
      this.dateAdapter.setLocale('ru');
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
      this.authenticationService.logout();
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    showForm(template: TemplateRef<any>) {
      this.modalService.show(template);
    }

    hideForm(template: TemplateRef<any>) {
    this.modalService.hide(1);
    }

  get getLoginFormControl() { return this.loginForm.controls; }
  get getRegisterFormontrol() {return this.registerForm.controls; }

  onLogin() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.userService.getByUsername(this.getLoginFormControl.username.value).subscribe(c => {
      this.user = c;
      console.log(this.user.role);
    });


    this.loading = true;
    this.modalService._hideModal(1);
    this.authenticationService.login(this.getLoginFormControl.username.value, this.getLoginFormControl.password.value)
      .pipe(first())
      .subscribe(
        data => {
          if (this.user.role === 'ADMIN') {
            this.router.navigate(['admin/structure']);
          } else {
            this.router.navigate(['user/survey']);
          }
        },
        error => {
          this.loading = false;
        });
  }

  onRegister() {
    const setOfRoles = new Set();
    const roles: Role[] = [];
    roles.push(new Role('USER', 'User role'));

    this.newUser = new UserCreateDto();
    this.address = new Address();
    this.loading = true;
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
    this.newUser.roles = roles;
    this.userService.createUser(this.newUser).subscribe(() => {

      this.userService.getByUsername(this.newUser.username).subscribe((result: User) => {
      console.log(result);
        this.upload(result);
      });

    });
    this.hideForm(this.registerRef);
  }

  send() {
      this.message.senderName = this.messageForm.controls.senderName.value;
      this.message.email = this.messageForm.controls.email.value;
      this.message.subject = this.messageForm.controls.subject.value;
      this.message.phone = this.messageForm.controls.phone.value;
      this.message.comment = this.messageForm.controls.comment.value;
      this.messageService.send(this.message).subscribe(() => { this.messageForm.reset(); });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.files.push(this.selectedFiles);
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

}
