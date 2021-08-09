import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { EmployeeserviceService } from 'src/app/services/employeeservice.service';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  empId: number;
  updateForm: FormGroup;
  employee: Employee = new Employee();

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router,
    // tslint:disable-next-line:align
    private service: EmployeeserviceService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.empId = +params.get('empId');
      console.log('this.empId-->', this.empId);
    });

    this.updateForm = this.formBuilder.group({
      empId: [{ value: '', disabled: true }],
      empName: [''],
      email: [''],
      location: ['']
    });

    console.log('this.empId-->', this.empId);

    this.getEmployeeByEmpId(this.empId.toString());
  }

  getEmployeeByEmpId(empId: string) {
    this.service.getEmployeeByEmpId(empId).subscribe(res => {
      this.employee = res;

      this.updateForm.get('empId').setValue(this.empId);
      this.updateForm.get('empName').setValue(this.employee.empName);
      this.updateForm.get('email').setValue(this.employee.email);
      this.updateForm.get('location').setValue(this.employee.location);
    }, error => {
      console.log('Error while getEmployeeByEmpId Rest API Call');
    });
  }

  onSubmit() {
    const employee: Employee = new Employee();
    employee.empId = this.empId;
    employee.empName = this.updateForm.controls.empName.value;
    employee.email = this.updateForm.controls.email.value;
    employee.location = this.updateForm.controls.location.value;

    console.log('new updated employee ->', employee);

    this.service.updateEmployee(employee).subscribe(res => {
      this.employee = res;
    }, error => {
      console.log('Error while updateEmployee Rest API Call');
    }, () => {
      this.router.navigateByUrl('');
    });

  }

}
