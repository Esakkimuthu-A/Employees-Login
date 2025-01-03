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
  userDetails: any;
  uploadImage: any;
  uploadOnlyImage: any;
  array: any;
  imageUrl: any;
  selectMenuIndex : any;
  employeeGender : any;
  employeeCount: any;
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
    this.userDetails = response;
    this.employeeGender =response?.gender?.gender;
  }

  OnClick() {
    this.dialog.open(this.editProfile, {
      width: "400px",
      height: "350px"
    });
  }

  openFileExplorer() {
    this.fileInput.nativeElement.click();
  }

  handleFileInput(event: any) {
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
      console.log("uploadImage",this.uploadImage);
		}
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
