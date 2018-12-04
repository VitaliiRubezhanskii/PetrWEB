import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { first } from 'rxjs/operators';


import {AuthenticationService, UserService} from '../_services';
import { BsModalService, BsModalRef} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {ActivatedRoute, Router} from '@angular/router';
import {User} from "../_models";
import {UserCreateDto} from "../_models/UserCreateDto";
import {Address} from "../_models/address";
import {Bank} from '../_models/bank';
import {BankService} from '../_services/bank.service';
import {CooperationMessage} from '../_models/cooperationMessage';
import {CooperationMessageService} from '../_services/cooperation-message.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {UploadFileService} from '../_services/uploadFile.service';


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
  currentFileUpload: File;
  files: FileList[] = [];

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
                ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
      this.messageForm = this.formBuilder.group({senderName: '', email: '', subject: '', phone: '', comment: ''});
      this.bankService.getAllBanks().subscribe(data => { this.banks = data; });
      this.registerForm = this.formBuilder.group({
        name: '', middleName: '', surname: '', username: '', password: '', email: '', oblast: '', city: '',
        street: '', buildingNum: '', apartmentNum: '', phone: '', card: '', inn: '', passport: '', bank: ''
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
    this.newUser = new UserCreateDto();
    this.address = new Address();
    this.loading = true;
    this.newUser.name = this.registerForm.controls.name.value;
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
    console.log('Hello from upload documents method')
    this.progress.percentage = 0;
    const documentsTypes = new Map<File, string>();
    documentsTypes.set(this.files[0].item(0), 'PERSONAL_PHOTO');
    documentsTypes.set(this.files[1].item(0), 'INN');
    documentsTypes.set(this.files[2].item(0), 'PASSPORT_FIRST_PAGE');
    documentsTypes.set(this.files[3].item(0), 'PASSPORT_SECOND_PAGE');
    documentsTypes.set(this.files[4].item(0), 'PASSPORT_LAST_PAGE');
    // this.currentFileUpload = this.selectedFiles.item(0);

    setTimeout(() => {
     documentsTypes.forEach((value: string, key: File) => {
       console.log(value +'------'+ key);
       setTimeout(() => {
         this.uploadService.pushFileToStorage(key, value, user).subscribe(() => {
         });

       }, 500);
      });
    }, 1000);

    // setTimeout()

    // subscribe(event => {
    //   if (event.type === HttpEventType.UploadProgress) {
    //     this.progress.percentage = Math.round(100 * event.loaded / event.total);
    //   } else if (event instanceof HttpResponse) {
    //     console.log('File is completely uploaded!');
    //   }
    // })

    this.selectedFiles = undefined;
  }
}
