import {Survey} from './Survey';
import {Role, User} from './user';
import {Address} from './address';

export class SurveyResult {

  id: number;
  survey: Survey;
  user: User;
  date: Date;
  count: number;
  bonus: number;

}

export class SurveyResultDto {

  id: number;
  name: string;
  surname: string;
  middleName: string;
  birthDate: string;
  phone: string;
  gender: string;
  email: string;
  inn: string;
  username: string;
  passport: string;
  issuedBy: string;
  issuedWhen: string;
  parentId: number;
  card: string;
  address: Address;
  bank: number;
  password: string;
  roles: Role[];
  count: number;
  sum: number;
}
