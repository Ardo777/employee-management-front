import {Component} from '@angular/core';
import {Company} from "../interface/company";
import {CompanyService} from "../services/company.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrl: './update-company.component.css'
})
export class UpdateCompanyComponent {
  company: Company = new Company();
  id: number = 0;

  constructor(private companyService: CompanyService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.companyService.getById(this.id).subscribe(data => {
      this.company = data;
      console.log(data);
    })
  }

  goToCompanyList() {
    this.router.navigate(['/companies']);
  }

  onSubmit() {
    this.companyService.updateCompany(this.company).subscribe(data => {
      this.company = data;
      this.goToCompanyList();
    })
  }
}
