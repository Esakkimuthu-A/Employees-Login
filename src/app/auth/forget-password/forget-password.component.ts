/**
 * Which is used to display forget password form.
 */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { SnackBarService, SnackType } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})

export class ForgetPasswordComponent implements OnInit{
  /**
   * Variable used to store the formGroup.
   */
  forgetForm !:FormGroup;
  /**
   * Variable used to store the user Id.
   */
  userId !: any;
  /**
   * Variable used to handle password match or mismatch.
   */
  passwordMismatch:boolean=false;
  constructor(private EmployeService :EmployeeService,private router:Router, private snackBar: SnackBarService
  ){

  }
  /**
   * Angular life cycle hook that initiates the component.
   */
  ngOnInit(){
    this.formInitialize();
    this.getUserId();
  }

  /**
   * Method which is used to construct the form datas.
   */
  formInitialize(){
    this.forgetForm=new FormGroup({
      password : new FormControl(null,Validators.required),
      confirmPassword : new FormControl(null,Validators.required)
    })
  }

  /**
   * Method which is used to get User id.
   */
  getUserId(){
    this.userId = sessionStorage.getItem('userId');
  }

  /**
   * Method which is used to valid user password.
   */
  OnSubmit(){
    if(this.forgetForm.valid){
      this.forgetForm.value['id']=+this.userId;
      this.EmployeService.changePassword(this.forgetForm.value).subscribe((res : any)=>{
        if(res.updatePassword){
          this.forgetForm.reset();
          this.snackBar.openSnackBar({ message: 'You successfully reset your password', main: SnackType.Success })
        }
      },(err)=> {
        console.error(err);
        this.snackBar.openSnackBar({ message: 'Password reset failed', main: SnackType.Error })
      })
    }
  }

  /**
   * Method which is used to cancle form.
   */
  OnCancel(){
    this.forgetForm.reset();
  }
  
  /**
   * Method which is used to construct the form datas.
   */
  OnChange(){
    const password=this.forgetForm?.get('password')?.value;
    const confirmPassword= this.forgetForm?.get('confirmPassword')?.value;
    if(password != confirmPassword){
      this.forgetForm?.get('confirmPassword')?.setErrors({passwordMismatch:true});
    }
  }

}
