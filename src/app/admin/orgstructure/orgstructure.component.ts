import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {UserService} from '../../_services';

import {ActivatedRoute} from '@angular/router';
import {User} from "../../_models";
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {PagerService} from "../../_services/pager.service";
import {FormBuilder, FormGroup} from '@angular/forms';
import {UploadFileService} from '../../_services/uploadFile.service';

@Component({
  selector: 'app-admin',
  templateUrl: './orgstructure.component.html',
  styleUrls: ['./orgstructure.component.css']
})
export class OrgstructureComponent implements OnInit {

  @ViewChild('editUserForm')
  editUserFormRef: TemplateRef<any>
  users: User[];
  user: User;
  isUserDeleted: boolean;
  modalRef: BsModalRef;
  pager: any = {};
  pagedItems: any[];
  allItems: any[];
  editUserForm: FormGroup;


  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private uploadService: UploadFileService,
              private formBuilder: FormBuilder,
              private modalService: BsModalService,
              private pagerService: PagerService) { }

  ngOnInit() {
    // this.route.data.subscribe( (data: {
    //   customerArray: Array<Customer>
    // }) => this.customers = data.customerArray);
    this.editUserForm = this.formBuilder.group({
      middleName: '',
      oblast: '',
      city: '',
      street: '',
      buildingNum: '',
      apartmentNum: '',
      phone: '',
      email: ''
    })
      this.userService.getAllUsers().subscribe(result => {
        console.log(result);
        this.users = result;
         });
   }



  deleteUser(user: User) {

    this.isUserDeleted = !user.deleted;
    this.userService.deleteUser(user).subscribe(u => {});
  }

  editUser(user: User) {
    user.middleName = this.editUserForm.controls.middleName.value;
    user.address.oblast = this.editUserForm.controls.oblast.value;
    user.address.city = this.editUserForm.controls.city.value;
    user.address.street = this.editUserForm.controls.street.value;
    user.address.buildingNum = this.editUserForm.controls.buildingNum.value;
    user.address.apartmentNum = this.editUserForm.controls.apartmentNum.value;
    user.phone = this.editUserForm.controls.phone.value;
    user.email = this.editUserForm.controls.email.value;
    console.log(user)
    this.userService.editUser(user).subscribe(u => {console.log(user);});
    this.modalService.hide(1);

  }

  showEditForm(template: TemplateRef<any>, user: User) {
    this.user = user;
    this.modalService.show(template);
  }

  hideEditForm() {
    this.modalService.hide(1);
  }


  setPage(page: number) {
    console.log(page)
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  download(user: User) {
    this.uploadService.getFile(user).subscribe(u => {});
  }
}
