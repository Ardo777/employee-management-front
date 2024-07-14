import {Component} from '@angular/core';
import {Employee} from "../interface/employee";
import {EmployeeService} from "../services/employee.service";
import {Router} from "@angular/router";
import {CompanyService} from "../services/company.service";
import {Company} from "../interface/company";

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent {

  employee: Employee = new Employee();
  companies: Company[] = [];
  selectedFile: File | null = null;
  selectedCompanyId: number = 0;

  constructor(private employeeService: EmployeeService, private router: Router, private companyService: CompanyService) {
  }

  ngOnInit(): void {
    this.getAllCompanies();
  }

  getAllCompanies() {
    this.companyService.getAllCompaniesObservable().subscribe(data => {
      this.companies = data;
      console.log(this.companies);
    });
  }

  onSubmit(): void {
    this.insertEmployee();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  insertEmployee(): void {
    if (this.selectedCompanyId !== undefined) {
      const selectedCompany = this.companies.find(company => company.id === this.selectedCompanyId);
      if (selectedCompany) {
        this.employee.company = selectedCompany;
        const formData = new FormData();
        formData.append('employee', new Blob([JSON.stringify(this.employee)], {type: 'application/json'}));
        if (this.selectedFile) {
          formData.append('picture', this.selectedFile, this.selectedFile.name);
        }
        this.employeeService.createEmployee(formData).subscribe({
          next: (data) => {
            this.goToEmployeeList();
          },
          error: (error) => {
            this.goToEmployeeList()
            console.error('Error creating employee:', error);
          }
        });
      }
    }
  }

  goToEmployeeList(): void {
    this.router.navigate(['employees']);
  }

}
