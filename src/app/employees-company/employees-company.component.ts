import {Component} from '@angular/core';
import {Company} from "../interface/company";
import {ActivatedRoute} from "@angular/router";
import {EmployeeService} from "../services/employee.service";
import {Employee} from "../interface/employee";

@Component({
  selector: 'app-employees-company',
  templateUrl: './employees-company.component.html',
  styleUrl: './employees-company.component.css'
})
export class EmployeesCompanyComponent {

  employees: Employee []=[];
  company: Company = new Company();
  id: number = 0;

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute) {
  }

  private getEmployeesByCompanyId(id: number) {
    this.employeeService.getEmployeesByCompanyId(id).subscribe(data => {
      this.employees = data.concat();
      this.employees.forEach(employee => {
        this.employeeService.loadedImageAddInEmployee(employee);
      });
    })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getEmployeesByCompanyId(this.id);
  }

}
