import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, ObservableInput} from 'rxjs';
import {Bank} from '../_models/bank';

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


}
