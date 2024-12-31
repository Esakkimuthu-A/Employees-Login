import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './shared/services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private EmployeeService : EmployeeService){
  }
  
  ngOnInit(): void {
      this.EmployeeService.getErrorMessages();
  }
}
