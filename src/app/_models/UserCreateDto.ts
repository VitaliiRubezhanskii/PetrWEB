import {Address} from "./address";
import {Bank} from './bank';
import {Role} from './user';

export class UserCreateDto {
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

}
