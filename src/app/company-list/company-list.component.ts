import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { CompanyService } from "../services/company.service";
import { Company } from "../interface/company";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  companies: Company[] = [];

  constructor(private companyService: CompanyService,private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.getAllCompanies()
  }

  getAllCompanies(){
    this.companyService.getAllCompaniesObservable().subscribe(data =>{
      this.companies = data;
      console.log(this.companies);
    });
  }

  viewEmployeesByCompany(company: Company) {
    this.router.navigate(['employees-company', company.id]).then(r => {});
  }

  editCompany(id: number) {
    this.router.navigate(['update-company', id]).then(r => {});
  }

  delete(id: number) {
    this.companyService.deleteCompany(id).subscribe(data => {
      this.getAllCompanies();
    });
  }

  isLoggedIn() {
    return  this.userService.isLoggedIn();
  }
}
