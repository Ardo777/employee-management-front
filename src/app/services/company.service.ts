import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, finalize, Observable, tap, throwError} from "rxjs";
import {Company} from "../interface/company";

@Injectable()
export class CompanyService {

  companies: Company[] = [];
  private baseURL = "http://localhost:8080";

  constructor(private httpClient: HttpClient) {
  }

   getAllCompaniesObservable(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(`${this.baseURL}/companies`);
  }

  getById(id: number): Observable<Company> {
    return this.httpClient.get<Company>(`${this.baseURL}/company/${id}`);
  }

  createCompany(company: Company): Observable<Company> {
    return this.httpClient.post<Company>(`${this.baseURL}/createCompany`, company);
  }

  updateCompany(company: Company): Observable<Company> {
    return this.httpClient.put<Company>(`${this.baseURL}/updateCompany/${company.id}`, company);
  }

  deleteCompany(id: number) {
    return this.httpClient.delete<Company>(`${this.baseURL}/deleteCompany/${id}`);
  }


}
