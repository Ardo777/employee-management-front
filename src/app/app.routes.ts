import {RouterModule, Routes} from '@angular/router';
import {ListEmployeeComponent} from "./list-employee/list-employee.component";
import {CreateEmployeeComponent} from "./create-employee/create-employee.component";
import {UpdateEmployeeComponent} from "./update-employee/update-employee.component";
import {EmployeeDetailsComponent} from "./employee-details/employee-details.component";
import {CompanyListComponent} from "./company-list/company-list.component";
import {CompanyDetailsComponent} from "./company-details/company-details.component";
import {CreateCompanyComponent} from "./create-company/create-company.component";
import {EmployeesCompanyComponent} from "./employees-company/employees-company.component";
import {UpdateCompanyComponent} from "./update-company/update-company.component";
import {UserRegisterComponent} from "./user-register/user-register.component";
import {UserLoginComponent} from "./user-login/user-login.component";
import {EmailVerificationComponent} from "./email-verification/email-verification.component";
// import {AuthGuard} from "./guards/auth-guard";
import {NgModule} from "@angular/core";
import {AuthGuard} from "./guards/auth-guard";


export const routes: Routes = [

  {path: 'employees', component: ListEmployeeComponent},
  {path: 'create-employee', component: CreateEmployeeComponent,canActivate: [AuthGuard]},
  {path: '', redirectTo: 'employees', pathMatch: 'full'},
  {path: 'update-employee/:id', component: UpdateEmployeeComponent,canActivate: [AuthGuard]},
  {path: 'employee-details/:id', component: EmployeeDetailsComponent},
  {path: 'companies', component: CompanyListComponent},
  {path: 'company-details/:id', component: CompanyDetailsComponent},
  {path: 'create-company', component: CreateCompanyComponent,canActivate: [AuthGuard]},
  {path: 'employees-company/:id', component: EmployeesCompanyComponent},
  {path: 'update-company/:id', component: UpdateCompanyComponent,canActivate: [AuthGuard]},
  {path: 'user/register', component: UserRegisterComponent},
  {path: 'user/login',component:UserLoginComponent},
  {path: 'user/email-verification',component:EmailVerificationComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes{

}
