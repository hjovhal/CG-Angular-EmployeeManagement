import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeeserviceService } from 'src/app/services/employeeservice.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  employees: Employee[] = [];
  searchText = '';
  constructor(private service: EmployeeserviceService) {
  }

  ngOnInit() {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.service.getAllEmployees().subscribe(res => {
      this.employees = res;
      console.log(this.employees);
    }, error => {
      console.log('Error while getAllEmployees Rest API Call');
    });
  }

}


