import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { SocialMediaContentComponent } from './social-media-content/social-media-content.component';

@NgModule({
  declarations: [
    LoginFormComponent,
    RegisterFormComponent,
    NavbarComponent,
    ForgetPasswordComponent,
    DashboardPageComponent,
    SocialMediaContentComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    MatTabsModule
  ],
  exports: [
      LoginFormComponent,
      RegisterFormComponent,
      NavbarComponent,
      ForgetPasswordComponent,
      DashboardPageComponent,
      SocialMediaContentComponent
    ]
})
export class AuthModule { }
