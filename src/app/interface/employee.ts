import {Company} from "./company";

export class Employee {

  id: number=0;
  name: string='';
  surname: string='';
  salary: number=0;
  "company":Company;
  picture: string='';
  imageUrl?: string;
}
