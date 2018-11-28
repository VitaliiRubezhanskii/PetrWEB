import { Component, OnInit } from '@angular/core';
import {UserService} from '../../_services';
import {Customer} from '../../_models/customer';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './orgstructure.component.html',
  styleUrls: ['./orgstructure.component.css']
})
export class OrgstructureComponent implements OnInit {

  customers: Customer[]=null;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.route.data.subscribe( (data: {
    //   customerArray: Array<Customer>
    // }) => this.customers = data.customerArray);
this.userService.getAllUsers().subscribe(result => {
  console.log(result);
  this.customers = result;
   });
   }

  editCustomer(username: string){
    console.log("Edited user with username: "+ username)
  }

}
