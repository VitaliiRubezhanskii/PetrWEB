import {User} from './user';

export class Address {

  id: number;
  oblast: string;
  city: string;
  street: string;
  buildingNum: string;
  apartmentNum: string;
  users: User[];

  public toString(): string {
    return `${this.oblast} ${this.city} ${this.street} ${this.buildingNum} ${this.apartmentNum} `;
  }



}
