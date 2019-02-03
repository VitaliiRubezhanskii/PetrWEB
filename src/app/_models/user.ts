import {Address} from './address';


export class User {
    id: number;
    role: string;
    gender: string;
    deleted: boolean;
    verify: boolean;
    name: string;
    middleName: string;
    surname: string;
    patronymic: string;
    birthDate: number;
    phone: string;
    email: string;
    inn: string;
    passport: string;
    issuedBy: string;
    issuedWhen: string;
  passwordFirstPage: string;
  passwordSecondPage: string;
  passwordLastPage: string;
  photoInn: string;
  photo: string;
  date: number;
  card: string;
  username: string;
  password: string;
  address: Address;
  roles: Role[];

}

export class Role {
  id: number;
  name: string;
  description: string;
}

enum Gender {
  Мужской,
  Женский
}
