import {Component} from '@angular/core';
import {EmployeeService} from "../services/employee.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Employee} from "../interface/employee";
import {Company} from "../interface/company";
import {CompanyService} from "../services/company.service";

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent {
  id: number = 0;
  employee: Employee = new Employee();
  private selectedFile: any;
  selectedCompanyId: number = 0;
  companies: Company[] = [];


  constructor(private employeeService: EmployeeService, private companyService: CompanyService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.getAllCompanies()
    this.id = this.route.snapshot.params['id'];
    this.employeeService.getEmployeeById(this.id).subscribe(data => {
      this.employee = data;
      this.employeeService.loadedImageAddInEmployee(this.employee)
    })
  }

  getAllCompanies() {
    this.companyService.getAllCompaniesObservable().subscribe(data => {
      this.companies = data;
      console.log(this.companies);
    });
  }

  onSubmit() {
    if (this.selectedCompanyId !== undefined) {
      const selectedCompany = this.companies.find(company => company.id === this.selectedCompanyId);
      if (selectedCompany) {
        this.employee.company = selectedCompany;
        const employeeData = new FormData();
        employeeData.append('employee', new Blob([JSON.stringify(this.employee)], {type: 'application/json'}));
        if (this.selectedFile) {
          employeeData.append('picture', this.selectedFile, this.selectedFile.name);
        } else {
          this.employeeService.loadedImageAddInEmployee(this.employee);
          employeeData.append('picture', this.employee.picture);
        }
        this.employeeService.updateEmployee(this.id, employeeData).subscribe({
          next: (data) => {
            this.goToEmployeeList();
          },
          error: (error) => {
            console.error('Error updating employee:', error);
          }
        });
      }
    }
  }

  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
}
