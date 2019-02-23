import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BankService} from '../../../../_services/bank.service';
import {Bank} from '../../../../_models/bank';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BsModalService} from 'ngx-bootstrap';
import {BankCreateDto} from '../../../../_models/BankCreateDto';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {
  @ViewChild('newBankForm')
  private newBankForm: TemplateRef<any>;
  banks: Bank[];
  bank: BankCreateDto = new BankCreateDto();
  bankForm: FormGroup;

  constructor(private bankService: BankService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.getAllBanks();
    console.log(this.banks)
    this.bankForm = this.formBuilder.group({
      bankName: ''
    });
  }


  deleteBank(bank: Bank) {
    this.bankService.deleteBank(bank).subscribe(b => {});

  }

  addNewBank() {
   this.bank.name = this.bankForm.controls.bankName.value;
    this.bankService.addNewBank(this.bank).subscribe(b => {this.getAllBanks()});
    this.hideForm();
  }

  showForm(template: TemplateRef<any>) {
    this.modalService.show(template);
  }

  hideForm() {
    this.modalService.hide(1);
  }

  getAllBanks() {
    this.bankService.getAllBanks().subscribe(data => { this.banks = data; });
  }

}
