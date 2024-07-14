import {Component} from '@angular/core';
import {Company} from "../interface/company";
import {CompanyService} from "../services/company.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrl: './create-company.component.css'
})
export class CreateCompanyComponent {

  "company": Company = new Company();

  constructor(private companyService: CompanyService, private router: Router) {
  }

  onSubmit() {
    this.insertCompany()
    console.log(this.company);
  }

  private insertCompany() {
    this.companyService.createCompany(this.company).subscribe(data => {
      this.goToCompanyList();
      console.log(data);
    })
  }

  private goToCompanyList() {
    this.router.navigate(['companies']);

  }
}
