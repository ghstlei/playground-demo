import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'
import { EmployeeLeave } from './employee-leave';
import { EmployeeLeaveService } from '../employee-leave/services/employee-leave.service';
import { Employee } from '../employee/employee';
import { ClientService } from '../client/services/client.service';
import { Client } from '../client/client';
import { EmployeeService } from '../employee/services/employee.service';

@Component({
  selector: 'app-employee-leave',
  templateUrl: './employee-leave.component.html',
  styleUrls: ['./employee-leave.component.scss']
})
export class EmployeeLeaveComponent implements OnInit {

  empDetail !: FormGroup;
  empObj: EmployeeLeave = new EmployeeLeave();
  empList: EmployeeLeave[] = [];
  employee: Employee[] = [];
  client: Client[] = [];

  constructor(private formBuider: FormBuilder, private leaveService: EmployeeLeaveService, private empService: EmployeeService, private clientService: ClientService) {
  }


  ngOnInit(): void {

    this.getAllLeave();

    this.empDetail = this.formBuider.group({
      id: [''],
      company_id: [''],
      employee_id: [''],
      employee_leave_type_id: [''],
      start: [''],
      days: [{value: '', disabled: true}],
      end: [{value: '', disabled: true}],
      type: [{value: '', disabled: true}],
    });

const startControl = this.empDetail.get('start');
const employeeLeaveTypeControl = this.empDetail.get('employee_leave_type_id');
const daysControl = this.empDetail.get('days');
const endControl = this.empDetail.get('end');
const typeControl = this.empDetail.get('type');

// Habilitar ou desabilitar 'type' com base em 'employee_leave_type_id'
if (employeeLeaveTypeControl && typeControl && daysControl) {
  employeeLeaveTypeControl.valueChanges.subscribe(selectedLeaveType => {  
    if (selectedLeaveType === 'Acidente de Trabalho') {
      typeControl.enable();
    } else {
      typeControl.disable();
    }
  });
}

// Habilitar ou desabilitar 'days' e 'end' com base em 'employee_leave_type_id'
if (employeeLeaveTypeControl && daysControl && endControl && startControl) {
  employeeLeaveTypeControl.valueChanges.subscribe(selectedLeaveType => {
    if (daysControl) {
      daysControl.setValue(0);
      endControl.setValue(null);
    }

    if (selectedLeaveType === 'Licença Maternidade') {
      daysControl.setValue(180);
      daysControl.disable();

      // Calcular a 'end' com base na 'start'
      const startDate = new Date(startControl.value);
      const endDate = new Date(startDate.setMonth(startDate.getMonth() + 6)); // Adicionar 6 meses
      endControl.setValue(endDate.toISOString().split('T')[0]); // Formatar como 'yyyy-mm-dd'
      endControl.disable();
    } else if (selectedLeaveType === 'Licença Paternidade') {
      daysControl.setValue(20);
      daysControl.disable();

      // Calcular a 'end' com base na 'start'
      const startDate = new Date(startControl.value);
      const endDate = new Date(startDate.setDate(startDate.getDate() + 20)); // Adicionar 20 dias
      endControl.setValue(endDate.toISOString().split('T')[0]); // Formatar como 'yyyy-mm-dd'
      endControl.disable();
    } else if (selectedLeaveType === 'Férias') {
      daysControl.enable();
      endControl.enable();
    } else {
      daysControl.disable();
      endControl.disable();
    }
  });
}



    // GET FUNCIONARIOS PARA O CAMPO SELECT

    this.empService.getAllEmployee().subscribe(employee => {
      this.employee = employee;
    });

    // GET CLIENT PARA O CAMPO SELECT

    this.clientService.getAllClient().subscribe(client => {
      this.client = client;
    });

  }


  addLeave() {

    console.log(this.empDetail);
    this.empObj.id = this.empDetail.value.id;
    this.empObj.company_id = this.empDetail.value.client_id;
    this.empObj.employee_id = this.empDetail.value.employee_id;
    this.empObj.employee_leave_type_id = this.empDetail.value.leave_type;
    this.empObj.start = this.empDetail.value.leave_date;
    this.empObj.days = this.empDetail.value.number_days;
    this.empObj.end = this.empDetail.value.return_date;
    this.empObj.type = this.empDetail.value.type;

    this.leaveService.addLeave(this.empObj).subscribe(res => {
      console.log(res);
      this.getAllLeave();
    }, err => {
      console.log(err);
    });
  }

  editLeave(emp: EmployeeLeave) {
    this.empDetail.controls['id'].setValue(emp.id);
    this.empDetail.controls['client_id'].setValue(emp.company_id);
    this.empDetail.controls['employee_id'].setValue(emp.employee_id);
    this.empDetail.controls['leave_type'].setValue(emp.employee_leave_type_id);
    this.empDetail.controls['leave_date'].setValue(emp.start);
    this.empDetail.controls['number_days'].setValue(emp.days);
    this.empDetail.controls['return_date'].setValue(emp.end);
    this.empDetail.controls['type'].setValue(emp.type);

  }

  updateLeave() {
    this.empObj.id = this.empDetail.value.id;
    this.empObj.company_id = this.empDetail.value.client_id;
    this.empObj.employee_id = this.empDetail.value.employee_id;
    this.empObj.employee_leave_type_id = this.empDetail.value.leave_type;
    this.empObj.start = this.empDetail.value.leave_date;
    this.empObj.days = this.empDetail.value.number_days;
    this.empObj.end = this.empDetail.value.return_date;
    this.empObj.type = this.empDetail.value.type;


    this.leaveService.updateLeave(this.empObj).subscribe(res => {
      console.log(res);
      this.getAllLeave();
    }, err => {
      console.log(err);
    });

  }

  getAllLeave() {

    this.leaveService.getAllLeave().subscribe(res => {
      this.empList = res;
    }, err => {
      console.log("error while fetching data.")
    });

  }

  deleteLeaveById(emp: EmployeeLeave) {
    this.leaveService.deleteLeaveById(emp).subscribe(res => {
      console.log(res);
      alert('Employee deleted successfull');
      this.getAllLeave;
    }, err => {
      console.log(err);
    });


  }

}

