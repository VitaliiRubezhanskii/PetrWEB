import {Address} from "./address";

export class UserCreateDto {
   name: string;
   surname: string;
   middleName: string;
   birthDate: number;
   phone: string;
   gender: string;
   email: string;
   inn:string;
   username:string;
   passport: string;
   issuedBy: string;
   issuedWhen: string;
   parentId: number;
   bank: number;
   card: string;
   address: Address;

}
