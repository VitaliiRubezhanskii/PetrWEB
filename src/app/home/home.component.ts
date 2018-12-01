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
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  user: User;
  username: string


    constructor(
                private userService: UserService,
                private bankService: BankService,
                private modalService: BsModalService,
                private authenticationService: AuthenticationService,
                private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        // this.loadAllUsers();
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
      this.bankService.getAllBanks().subscribe(data => { this.banks = data; })

      this.registerForm = this.formBuilder.group({
        name: '',
        middleName: '',
        surname: '',
        username: '',
        password: '',
        email: '',
        oblast: '',
        city: '',
        street: '',
        buildingNum: '',
        apartmentNum: '',
        phone: '',
        card: '',
        inn: '',
        passport: '',
        bank: ''
      });
      // reset login status
      this.authenticationService.logout();

      // get return url from route parameters or default to '/'
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
    this.modalService._hideModal(1)
    this.authenticationService.login(this.getLoginFormControl.username.value, this.getLoginFormControl.password.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data)
          console.log(this.returnUrl);
          if (this.user.role === 'ADMIN') {
            this.router.navigate(['admin/structure']);
          } else {
            this.router.navigate(['user/survey']);
          }
        },
        error => {
          // this.alertService.error(error);
          this.loading = false;
        });
  }

  onRegister() {
    console.log('Inside onRegister')
    // this.submitted = true;
    //
    // // stop here if form is invalid
    // if (this.registerForm.invalid) {
    //   return;
    // }
    // this.newUser = new UserCreateDto();
    // this.address = new Address();

    this.newUser = new UserCreateDto();
    this.address = new Address();
    // this.bank = new Bank();
    this.loading = true;
    // this.bankService.findBankByName(this.registerForm.controls.bank.value).subscribe((data: Bank) => {
    //   console.log(data)
    //   this.bank = data;
    //   console.log(this.bank);
    //   this.newUser.bank = this.bank.id;
    // });
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
    this.newUser.bank = this.registerForm.controls.bank.value
    this.newUser.address = this.address;
    console.log(this.newUser);

    this.userService.createUser(this.newUser).subscribe(() => { });
    this.hideForm(this.registerRef);

  }



}
