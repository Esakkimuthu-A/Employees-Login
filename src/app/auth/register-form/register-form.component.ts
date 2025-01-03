import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { SnackBarService, SnackType } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
  @ViewChild('GENERAL',{static:true}) GENERAL !:TemplateRef<any>;
  @ViewChild('CONTACT',{static:true}) CONTACT !: TemplateRef<any>;
  employeeform !: FormGroup;
  constructor(private EmployeService: EmployeeService, private route: ActivatedRoute, private Router: Router,private SnackBar : SnackBarService) {}

  selectedTemplate !: TemplateRef<any>;
  errorMessage:any;
  userData!:any[];
  employeeDepartment: any;
  employeeRole: any;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  passwordMismatch: boolean = true;
  LoginUserNotShow: boolean = true;
  buttonShow: boolean = false;
  contactShow: boolean = false;
  UserDetailes: any;
  templateCategory !: any[];
  editId !: number;
  employeeMarital:any;
  employeeGender :any;
  hoverIndex=0;
  uploadImage: any;
  uploadOnlyImage: any;
  documentData !:any[];

  ngOnInit() {
    this.InitialLoading();
    this.TemplateDetails();
    this.getEmployeeDetails();
    if (sessionStorage.getItem('userId')) {
      this.LoginUserNotShow = false;
    }
  }

  TemplateDetails(){
    this.templateCategory=[
      {name:'General Info' , template:this.GENERAL},
      {name:'Contact',template:this.CONTACT}
    ]
    this.EmployeService.errorMessage.subscribe((res:any) =>{
      this.errorMessage =res;
    });
    this.selectedTemplate=this.templateCategory[this.hoverIndex]?.template;
  }

  /**
   * which method used to loading the initial details
   */
  InitialLoading(){
    this.EmployeService.getRole().pipe(mergeMap((res: any)=>{
     if(res && res['role']){
       this.employeeRole = res.role;
     }
     return  this.EmployeService.getDepartment();
    }), mergeMap((res:any)=>{
     if(res && res['department']){
       this.employeeDepartment = res.department;
     } 
     return this.EmployeService.getMaritalstatus();
    }), mergeMap((res :any)=>{
     if(res){
       this.employeeMarital=res.marital;
     }
     return this.EmployeService.getGender();
    })
   ).subscribe(
     (res: any) => {
       if (res && res['gender']) {
         this.employeeGender = res.gender;
       }
     },
     (err) => {
       console.error('Error in fetching details', err);
       this.SnackBar.openSnackBar({message:'Failed to fech details',main: SnackType.Error})
     }
   );
   }

  /**
   * which method used to get Employee Details.
   */
  getEmployeeDetails(){
    const value = sessionStorage.getItem('userId');
    this.route.params.subscribe((res: any) => {
      if (res && res.data && res.id) {
        this.editId = res.id;
        this.EmployeService.getEmployeeDetailes({ id: res.id }).subscribe((res: any) => {
          this.UserDetailes = res.EmpDetailes;
          this.formInitilaize();
          this.buttonShow = true;
        })
      }
      else if (value) {
        this.EmployeService.getEmployeeDetailes({ id: value }).subscribe((res: any) => {
          if (res) {
            this.UserDetailes = res.EmpDetailes;
            this.formInitilaize();
            this.employeeform?.disable();
            this.buttonShow = false;
          }
        });
      }
      else {
        this.formInitilaize();
      }
    });
  }

  /**
   * form initial loading
   */
  formInitilaize() {
    this.employeeform = new FormGroup({
      firstName: new FormControl(this.UserDetailes && this.UserDetailes.firstName ? this.UserDetailes.firstName : null, Validators.required),
      lastName: new FormControl(this.UserDetailes && this.UserDetailes.lastName ? this.UserDetailes.lastName : null, Validators.required),
      email: new FormControl(this.UserDetailes && this.UserDetailes.email ? this.UserDetailes.email : null, [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]),
      alternateEmail: new FormControl(this.UserDetailes && this.UserDetailes.alternateEmail ? this.UserDetailes.alternateEmail : null, [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]),
      dateOfBirth: new FormControl(this.UserDetailes && this.UserDetailes.dateOfBirth ? this.UserDetailes.dateOfBirth : null, Validators.required),
      dateOfJoining: new FormControl(this.UserDetailes && this.UserDetailes.dateOfJoining ? this.UserDetailes.dateOfJoining : null, Validators.required),
      departmentId: new FormControl(this.UserDetailes && this.UserDetailes.departmentId ? this.UserDetailes.departmentId : null, Validators.required),
      genderId:new FormControl(this.UserDetailes && this.UserDetailes.genderId ? this.UserDetailes.genderId :null,Validators.required),
      maritalstatusId :new FormControl(this.UserDetailes && this.UserDetailes.maritalstatusId ? this.UserDetailes.maritalstatusId : null, Validators.required),
      roleId: new FormControl(this.UserDetailes && this.UserDetailes.roleId ? this.UserDetailes.roleId : null, Validators.required),
      password: new FormControl(this.UserDetailes && this.UserDetailes.password ? this.UserDetailes.password : null, Validators.required),
      confirmPassword: new FormControl(this.UserDetailes && this.UserDetailes.confirmPassword ? this.UserDetailes.confirmPassword : null, Validators.required),
      addImage: new FormControl(this.UserDetailes && this.UserDetailes.addImage ? this.UserDetailes.addImage : null, Validators.required),
      isImage:new FormControl(this.UserDetailes && this.UserDetailes.isImage ? this.UserDetailes.isImage : null),
      contact: new FormArray([])
    })
    this.createArray();
  }

  createArray() {
    if (this.UserDetailes) {
      for (let i = 0; i < this.UserDetailes.employeecontacts.length; i++) {
        this.contactShow = true;
        (this.employeeform.get('contact') as FormArray).push(new FormGroup({
          address: new FormControl(this.UserDetailes && this.UserDetailes.employeecontacts[i]?.address ? this.UserDetailes.employeecontacts[i]?.address : null, Validators.required),
          city: new FormControl(this.UserDetailes && this.UserDetailes.employeecontacts[i]?.city ? this.UserDetailes.employeecontacts[i]?.city : null, Validators.required),
          district: new FormControl(this.UserDetailes && this.UserDetailes.employeecontacts[i]?.district ? this.UserDetailes.employeecontacts[i]?.district : null, Validators.required),
          state: new FormControl(this.UserDetailes && this.UserDetailes.employeecontacts[i]?.state ? this.UserDetailes.employeecontacts[i]?.state : null, Validators.required),
          country: new FormControl(this.UserDetailes && this.UserDetailes.employeecontacts[i]?.country ? this.UserDetailes.employeecontacts[i]?.country : null, Validators.required),
          pincode: new FormControl(this.UserDetailes && this.UserDetailes.employeecontacts[i]?.pincode ? this.UserDetailes.employeecontacts[i]?.pincode : null, Validators.required)
        }))
      }
    }
    else {
      (this.employeeform.get('contact') as FormArray).push(new FormGroup({
        address: new FormControl(null, Validators.required),
        city: new FormControl(null, Validators.required),
        district: new FormControl(null, Validators.required),
        state: new FormControl(null, Validators.required),
        country: new FormControl(null, Validators.required),
        pincode: new FormControl(null, Validators.required)
      }))
    }

  }

  create() {
    return (this.employeeform.get('contact') as FormArray).controls;
  }

  get getContacts() {
    return <FormArray>this.employeeform.get('contact');
  }

  removeItem(element: any) {
    (this.employeeform.get('contact') as FormArray).removeAt(element);
  }

  OnSubmit() {
    if (this.buttonShow) {
      this.employeeform.value.id = +this.editId;
      this.UserDetailes.firstName = this.employeeform.get('firstName')?.value;
      this.UserDetailes.lastName = this.employeeform.get('lastName')?.value;
      this.UserDetailes.email = this.employeeform.get('email')?.value;
      this.UserDetailes.alternateEmail = this.employeeform.get('alternateEmail')?.value;
      this.UserDetailes.dateOfBirth = this.employeeform.get('dateOfBirth')?.value;
      this.UserDetailes.dateOfJoining = this.employeeform.get('dateOfJoining')?.value;
      this.UserDetailes.departmentId = this.employeeform.get('departmentId')?.value;
      this.UserDetailes.roleId = this.employeeform.get('roleId')?.value;
      this.UserDetailes.genderId = this.employeeform.get('genderId')?.value;
      this.UserDetailes.password = this.employeeform.get('password')?.value;
      const data = this.employeeform.get('contact')?.value;
      for (let ind = 0; ind < this.UserDetailes.employeecontacts.length; ind += 1) {
        this.UserDetailes.employeecontacts[ind].address = data[ind].address;
        this.UserDetailes.employeecontacts[ind].city = data[ind].city;
        this.UserDetailes.employeecontacts[ind].district = data[ind].district;
        this.UserDetailes.employeecontacts[ind].state = data[ind].state;
        this.UserDetailes.employeecontacts[ind].country = data[ind].country;
        this.UserDetailes.employeecontacts[ind].pincode = data[ind].pincode;
      }
      this.EmployeService.EditEmployee(this.UserDetailes).subscribe((res: any) => {
        if (res.EditEmployee) {
          this.employeeform.reset();
          this.Router.navigate(['/app/user-details']);
        }
      })
    }
    else {
      if (this.employeeform.valid) {
        this.EmployeService.CreateEmployee(this.employeeform.value).subscribe((res: any) => {
          if (res) {
            this.employeeform.reset();
            this.SnackBar.openSnackBar({message:'Your account has been successfully created',main: SnackType.Success})
          }
        })
      }
    }
  }

  OnReset() {
    this.employeeform.reset();
  }

  showPasswordFieldText() {
    this.showPassword = !this.showPassword;
  }

  showConfirmPasswordText() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  addProfilePhoto(event: any) {
    if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.uploadOnlyImage = 'You must select an image';
			return;
		}
    var mimeType = event.target.files[0].type;
		if (mimeType.match(/image\/*/) == null) {
			this.uploadOnlyImage = "Only images are supported";
			return;
		}
    var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		reader.onload = (_event) => {
			this.uploadOnlyImage = "";
			this.uploadImage ={
        file: reader.result as string,
        fileName:event.target.files[0].name
      } 
      this.employeeform.get('addImage')?.setValue(this.uploadImage);
      this.employeeform.get('isImage')?.setValue(true);
		}
  }

  onChange() {
    const Password = this.employeeform.get('password')?.value;
    const ConfirmPassword = this.employeeform.get('confirmPassword')?.value;
    if (Password !== ConfirmPassword) {
      this.passwordMismatch = true;
      this.employeeform.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    }
  }

  userInforClick( id:any){
    this.hoverIndex=id;
    this.selectedTemplate=this.templateCategory[this.hoverIndex]?.template;
  }
}
