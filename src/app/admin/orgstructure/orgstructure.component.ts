import {Component, OnInit, TemplateRef} from '@angular/core';
import {UserService} from '../../_services';

import {ActivatedRoute} from '@angular/router';
import {User} from "../../_models";
import {BsModalService} from "ngx-bootstrap";
import {PagerService} from "../../_services/pager.service";

@Component({
  selector: 'app-admin',
  templateUrl: './orgstructure.component.html',
  styleUrls: ['./orgstructure.component.css']
})
export class OrgstructureComponent implements OnInit {

  users: User[];
  isUserDeleted: boolean = false;
  isEditFormShown: boolean = false;
  pager: any = {};
  pagedItems: any[];
  allItems: any[];

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private modalService: BsModalService,
              private pagerService: PagerService) { }

  ngOnInit() {
    // this.route.data.subscribe( (data: {
    //   customerArray: Array<Customer>
    // }) => this.customers = data.customerArray);
      this.userService.getAllUsers().subscribe(result => {
        console.log(result);
        this.users = result;
         });
   }

  editUser(id: number){

    console.log("Edited user with username: "+ id)
  }

  deleteUser(user: User) {
    this.isUserDeleted = !this.isUserDeleted;
    console.log('User id: ' + user.id);
    console.log(this.isUserDeleted);
    this.userService.deleteUser(user).subscribe(user =>{});
    user.deleted = this.isUserDeleted;
  }

  showForm(template: TemplateRef<any>) {
    this.modalService.show(template);
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
}
