import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './modules/client/client.component';
import { EmployeeComponent } from './modules/employee/employee.component';
import { EmployeeLeaveComponent } from './modules/employee-leave/employee-leave.component';
import { JobPositionComponent } from './modules/job-position/job-position.component';

const routes: Routes = [
  { path: '', redirectTo: 'client' },
  { path: 'client', component: ClientComponent},
  { path: 'employee', component: EmployeeComponent},
  { path: 'employee-leave', component: EmployeeLeaveComponent},
  { path: 'job-position', component: JobPositionComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
