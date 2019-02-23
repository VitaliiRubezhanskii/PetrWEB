import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LimitDTO} from '../_models/limits';
import {Observable} from 'rxjs';

@Injectable()
export class LimitService {

  constructor( public http: HttpClient ){

  }

  public saveLimits(surveyLimitDto: LimitDTO, surveyId: number): Observable<any> {
   return this.http.put(`http://localhost:8080/surveyLimits/` + surveyId , surveyLimitDto);
  }

  public getAllLimits(): Observable<any> {
    return this.http.get(`http://localhost:8080/surveyLimits/`);
  }

}
