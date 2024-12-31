import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './auth/login-form/login-form.component'; 
import { RegisterFormComponent } from './auth/register-form/register-form.component'; 
import { NavbarComponent } from './auth/navbar/navbar.component'; 
import { DashboardPageComponent } from './auth/dashboard-page/dashboard-page.component'; 
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component'; 

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent },
  { path: 'registerForm', component: RegisterFormComponent },
  {
    path: 'app', component: NavbarComponent, children: [
      { path: 'dashboard', component: DashboardPageComponent },
      { path: 'registerForm', component: RegisterFormComponent },
      { path: 'reg/:data/:id', component: RegisterFormComponent }
    ],
  },
  { path: 'forgetPassowrd', component: ForgetPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
