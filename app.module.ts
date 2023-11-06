import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddComponent } from './modules/product/components/add/add.component';
import { EditComponent } from './modules/product/components/edit/edit.component';
import { GridComponent } from './modules/product/components/grid/grid.component';
import { ProductComponent } from './modules/product/product.component';
import { ClientComponent } from './modules/client/client.component';
import { EmployeeComponent } from './modules/employee/employee.component';
import { JobPositionComponent } from './modules/job-position/job-position.component';
import { EmployeeLeaveComponent } from './modules/employee-leave/employee-leave.component';


@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    EditComponent,
    GridComponent,
    ProductComponent,
    ClientComponent,
    EmployeeComponent,
    JobPositionComponent,
    EmployeeLeaveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
