import {Component, OnInit, TemplateRef} from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import {AuthenticationService, UserService} from '../_services';
import { BsModalService, BsModalRef} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Customer} from '../_models/customer';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
     modalRef: BsModalRef;
  loginForm: FormGroup;
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  customer: Customer;
  username: string


    constructor(
                private userService: UserService,
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

      this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
      // reset login status
      this.authenticationService.logout();

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    showForm(template: TemplateRef<any>) {
      this.modalService.show(template);
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
      this.customer = c;
      console.log(this.customer.role);
    });


    this.loading = true;
    this.modalService._hideModal(1)
    this.authenticationService.login(this.getLoginFormControl.username.value, this.getLoginFormControl.password.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data)
          console.log(this.returnUrl);
          if (this.customer.role === 'ADMIN') {
            this.router.navigate(['admin/structure']);
          } else {
            this.router.navigate(['user']);
          }
        },
        error => {
          // this.alertService.error(error);
          this.loading = false;
        });
  }

  onRegister() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {
          this.loading = false;
        });
  }



}
