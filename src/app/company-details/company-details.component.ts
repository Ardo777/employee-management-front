import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Company} from "../interface/company";
import {CompanyService} from "../services/company.service";

@Component({
  selector: 'app-company-details',

  templateUrl: './company-details.component.html',
  styleUrl: './company-details.component.css'
})
export class CompanyDetailsComponent {

  id: number = 0;
  company: Company = new Company();

  constructor(private route: ActivatedRoute, private companyService: CompanyService) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.companyService.getById(this.id).subscribe(data => {
      this.company = data;
    })
  }

}
