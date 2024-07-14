import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Employee} from "../interface/employee";
import {EmployeeService} from "../services/employee.service";

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent {

  id: number = 0;
  employee: Employee = new Employee();

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.employeeService.getEmployeeById(this.id).subscribe(data => {
      this.employee = data;
      this.employeeService.loadedImageAddInEmployee(this.employee);
    })
  }


}
