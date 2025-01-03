import { Injectable } from '@angular/core';
import { HttpRoutingService } from './http-routing.service';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  errorMessage= new BehaviorSubject<any>(null);
  User =new BehaviorSubject<any>(null);
  userId !: number;
  constructor(private httpService:HttpRoutingService) { }
  
  loginForm(data :any){
    return this.httpService.PostMethod('login',data).pipe(map((res: any)=>{
      if(res && res['token'] && res['userId']){
        this.User.next(res['userId']);
        this.userId=res['userId'];
        sessionStorage.setItem('currentUserToken',JSON.stringify({token:res['token'],refreshtoken:res['refreshToken']}));
        sessionStorage.setItem('userId',JSON.stringify(res['userId']));
      }
      return res;
    }),catchError(err=>{
      return err;
    })
    )
  }
  
  CreateEmployee(data:any){
     return this.httpService.PostMethod('createEmployee',data);
  }
  getEmployee(){
    return this.httpService.GetMethod('getEmployee');
  }
  getEmployees(){
    return this.httpService.GetMethod('getEmployees');
  }
  getMaritalstatus(){
    return this.httpService.GetMethod('getMaritalstatus');
  }
  getDepartment(){
    return this.httpService.GetMethod('getDepartment');
  }
  getRole(){
    return this.httpService.GetMethod('getRole');
  }
  getGender(){
    return this.httpService.GetMethod('getGender');
  }
  getEmployeeDetailes(data:any){
    return this.httpService.PostMethod('getEmployeeDetailes',data);
  }

  getAllEmployeeDetails(){
    return this.httpService.GetMethod('getAllEmployeeDetails');
  }
  deleteEmployee(data:any){
    return this.httpService.PostMethod('deleteEmployee',data);
  }
  EditEmployee(data:any){
    return this.httpService.PostMethod('editEmployee',data);
  }
  getErrorMessages(){
    this.httpService.getJsonData('errorMessages.json').subscribe(res =>{
      this.errorMessage.next(res);
    })
  }
  changePassword(password : any){
    return this.httpService.PostMethod('changePassword',password);
  }

  getEmployeeCount(){
      return this.httpService.GetMethod('getEmplotyeeCount');
  }
}
