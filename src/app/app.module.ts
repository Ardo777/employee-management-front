import {NgModule} from "@angular/core";
import {provideRouter, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {routes} from "./app.routes";
import {HttpClientModule, provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {AppComponent} from "./app.component";
import {CompanyDetailsComponent} from "./company-details/company-details.component";
import {NgForOf, NgIf} from "@angular/common";
import {CompanyListComponent} from "./company-list/company-list.component";
import {CreateCompanyComponent} from "./create-company/create-company.component";
import {CreateEmployeeComponent} from "./create-employee/create-employee.component";
import {EmailVerificationComponent} from "./email-verification/email-verification.component";
import {EmployeeDetailsComponent} from "./employee-details/employee-details.component";
import {EmployeesCompanyComponent} from "./employees-company/employees-company.component";
import {EmployeeService} from "./services/employee.service";
import {CompanyService} from "./services/company.service";
import {UserService} from "./services/user.service";
import {BrowserModule} from "@angular/platform-browser";
import {ListEmployeeComponent} from "./list-employee/list-employee.component";
import {UpdateCompanyComponent} from "./update-company/update-company.component";
import {UpdateEmployeeComponent} from "./update-employee/update-employee.component";
import {UserLoginComponent} from "./user-login/user-login.component";
import {UserRegisterComponent} from "./user-register/user-register.component";
import {AuthGuard} from "./guards/auth-guard";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {jwtInterceptor} from "./interceptor/jwt.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    CompanyDetailsComponent,
    CompanyListComponent,
    CreateCompanyComponent,
    CreateEmployeeComponent,
    EmailVerificationComponent,
    EmployeeDetailsComponent,
    EmployeesCompanyComponent,
    ListEmployeeComponent,
    UpdateCompanyComponent,
    UpdateEmployeeComponent,
    UserLoginComponent,
    UserRegisterComponent,


  ],
  imports: [
    NgForOf,
    RouterLink,
    NgIf,
    FormsModule,
    BrowserModule,
    RouterOutlet,
    RouterLinkActive,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    EmployeeService,
    CompanyService,
    UserService,
    provideRouter(routes),
    provideHttpClient(),
    FormsModule,
    AuthGuard,
    provideHttpClient(withFetch(), withInterceptors([jwtInterceptor]),)
  ],
  exports:
    [],
  bootstrap: [AppComponent]

})
export class AppModule {
}
