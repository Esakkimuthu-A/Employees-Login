import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { TemplateRef, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { filter, mergeMap, of } from 'rxjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  UserDetailes: any;
  array: any;
  imageUrl: any;
  selectMenuIndex : any;
  employeeGender : any;
  
  menuDetails=[
    {"menuId":'1',"menuIconName":"person_outline","menuTitle":"My Info","menuNavigate":"registerForm"}
  ]

  @ViewChild('editProfile', { static: true }) editProfile!: TemplateRef<any>;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private router: Router, private EmplyeeService: EmployeeService, public dialog: MatDialog) {
  }
  
  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails(){
    this.imageUrl = '/assets/image_black.png';
    const userId = sessionStorage.getItem('userId');
    of(userId)
      .pipe(
        mergeMap((id) => this.EmplyeeService.getEmployeeDetailes({ id }))
      )
      .subscribe((res: any) => {
        if (res) {
          this.processData(res?.EmpDetailes);
        }
      });
  }

  processData(response : any){
    this.UserDetailes = response;
    this.employeeGender =response?.gender?.gender;
  }

  OnClick() {
    this.dialog.open(this.editProfile, {
      width: "400px",
      height: "320px"
    });
  }

  openFileExplorer() {
    this.fileInput.nativeElement.click();
  }

  handleFileInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.array = inputElement.files;
    const files = this.array[0].name;
    this.imageUrl = '/assets/' + files; 
  }
  
  onSelect(details :any): void{
      if(details){
        this.selectMenuIndex=details?.menuId;
        this.router.navigate(['/app/', details.menuNavigate]);
      }
  } 
  
  OnLogout() {
    sessionStorage.removeItem('currentUserToken');
    sessionStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
}
