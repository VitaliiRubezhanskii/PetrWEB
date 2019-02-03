import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, ObservableInput} from 'rxjs';
import {Bank} from '../_models/bank';
import {BankCreateDto} from '../_models/BankCreateDto';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class BankService {
  constructor(private http: HttpClient) {}


  findBankByName(bankName: string): Observable<Bank> {
    return this.http.get<Bank>(`http://localhost:8080/banks/bank/` + bankName);
  }
  getAllBanks(): Observable<Bank[]> {
    return this.http.get<Bank[]>(`http://localhost:8080/banks/all`);
  }

  deleteBank(bank: Bank) {
    bank.deleted = !bank.deleted;
    return this.http.post('http://localhost:8080/banks/deleted/' + bank.deleted + '/bank/' + bank.id, {});
  }

  addNewBank(bank: BankCreateDto): Observable<any> {
    return this.http.put(`http://localhost:8080/banks/new`, bank);
  }


}
