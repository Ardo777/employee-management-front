import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of, switchAll} from "rxjs";
import {Employee} from "../interface/employee";

@Injectable()
export class EmployeeService {

  private baseURL = "http://localhost:8080";

  constructor(private httpClient: HttpClient) {
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.baseURL}/employees`);
  }

  createEmployee(employeeData: FormData): Observable<object> {
    return this.httpClient.post(`${this.baseURL}/createEmployee`, employeeData);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.baseURL}/employees/${id}`);
  }

  updateEmployee(id: number, employeeData: FormData): Observable<Employee> {
    return this.httpClient.put<Employee>(`${this.baseURL}/updateEmployee/${id}`, employeeData);
  }

  deleteEmployee(id: number): Observable<object> {
    return this.httpClient.delete<Employee>(`${this.baseURL}/deleteEmployee/${id}`);
  }

  getEmployeesByCompanyId(id: number): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.baseURL}/employees-company/${id}`);
  }

  searchEmployeesByKeyword(keyword: string): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.baseURL}/employees/search/${keyword}`);
  }

  private loadImageForEmployeeObservable(imageId: string): Observable<string> {
    return this.httpClient.get(`${this.baseURL}/employee/picture/${imageId}`, {responseType: 'blob'})
      .pipe(
        map(blob => {
          const reader = new FileReader();
          return new Observable<string>(observer => {
            reader.onloadend = () => {
              observer.next(reader.result as string);
              observer.complete();
            };
            reader.readAsDataURL(blob);
          });
        }),
        switchAll()
      );
  }

  loadedImageAddInEmployee(employee: Employee) {
    if (!employee.picture) {
      console.error(`Employee ${employee.id} does not have a picture ID.`);
      return;
    }
    this.loadImageForEmployeeObservable(employee.picture).pipe(
      map(imageUrl => ({...employee, imageUrl})),
      catchError(error => {
        console.error(`Failed to load image for employee ${employee.id}`, error);
        return of(employee);
      })
    ).subscribe(otherEmployee => {
      employee.imageUrl = otherEmployee.imageUrl;
    });
  }


}
