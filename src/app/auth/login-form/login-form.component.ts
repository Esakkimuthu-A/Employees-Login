/**
 * Which is used to display login form
 */
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/services/employee.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent {
  /**
   * Variable used to store the formGroup.
   */
  loginForm !:FormGroup;
  /**
   * Variable used to handle page is loaded or not.
   */
  loader !:boolean;

  /**
   * component constructor which is used to inject the required services.
   * @param EmployeService to access the method from shared service
   * @param router to access route data
   */
  constructor(private EmployeService:EmployeeService,private router: Router){
  }

  /**
   * Angular life cycle hook that initiates the component.
   */
  ngOnInit(){
    this.formInitialize();
  }

  /**
   * Method which is used to construct the form datas.
   */
  formInitialize(){
    this.loginForm=new FormGroup({
      email:new FormControl(null,Validators.required),
      password:new FormControl(null,Validators.required)
    });
  }

  /**
   * Method which is used to login user valid or not.
   */
  Login(){
    this.loader=true;
    this.EmployeService.loginForm(this.loginForm.value).subscribe(res=>{
      if (res && res['userId']) {
        this.loader=false;
        this.router.navigate(['/app/dashboard']);
      }
      if(res.error){
        this.loader=false;
        this.loginForm.get('email')?.setErrors({ invalidError: true });
        this.loginForm.get('password')?.setErrors({error:true});
      }
    },(err) =>{
      this.loader=false;
    })
  }
}
