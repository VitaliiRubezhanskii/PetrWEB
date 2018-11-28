import { Component, OnInit } from '@angular/core';
import {UserService} from '../../_services';

import {ActivatedRoute} from '@angular/router';
import {User} from "../../_models";

@Component({
  selector: 'app-admin',
  templateUrl: './orgstructure.component.html',
  styleUrls: ['./orgstructure.component.css']
})
export class OrgstructureComponent implements OnInit {

  users: User[];
  isUserDeleted: boolean;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.route.data.subscribe( (data: {
    //   customerArray: Array<Customer>
    // }) => this.customers = data.customerArray);
this.userService.getAllUsers().subscribe(result => {
  console.log(result);
  this.users = result;
   });
   }

  editUser(username: string){
    console.log("Edited user with username: "+ username)
  }

  deleteUser(id: number, isDeleted: boolean) {
    this.isUserDeleted=isDeleted;
    console.log('User id: ' + id);
    this.userService.deleteUser(id, isDeleted).subscribe(user =>{});
  }

}
