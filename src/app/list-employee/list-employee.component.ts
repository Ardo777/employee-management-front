import {Component, OnInit} from '@angular/core';
import {Employee} from '../interface/employee';
import {EmployeeService} from '../services/employee.service';
import {Router} from '@angular/router';
import {AppComponent} from "../app.component";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  keyword: string = '';

  constructor(private employeeService: EmployeeService,private userService:UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  private getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe(
      data => {
        this.employees = data;
        this.filteredEmployees = data;
        this.employees.forEach(employee => {
          this.employeeService.loadedImageAddInEmployee(employee);
        });
      },
      error => {
        console.error('Failed to fetch employees', error);
      }
    );
  }

  updateEmployee(id: number) {
    this.router.navigate(['update-employee', id]).then(r => {
    });
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(
      data => {
        this.getAllEmployees();
      },
      error => {
        console.error('Failed to delete employee', error);
      }
    );
  }

  isLoggedIn() {
    return  this.userService.isLoggedIn();
  }

  viewEmployee(id: number) {
    this.router.navigate(['employee-details', id]).then(r => {
    });
  }

  viewCompany(id: number) {
    this.router.navigate(['company-details', id]).then(r => {
    });
  }

  filterEmployees() {
    if (!this.keyword.trim()) {
      this.filteredEmployees = this.employees;
    } else {
      this.employeeService.searchEmployeesByKeyword(this.keyword).subscribe(data => {
        this.filteredEmployees = data;
        this.filteredEmployees.forEach(employee => {
          this.employeeService.loadedImageAddInEmployee(employee);
        });
      })
    }
  }

  protected readonly AppComponent = AppComponent;
}
