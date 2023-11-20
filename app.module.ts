import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddComponent } from './modules/client/components/add/add.component';
import { EditComponent } from './modules/client/components/edit/edit.component';
import { GridComponent } from './modules/client/components/grid/grid.component';
import { ClientComponent } from './modules/client/client.component';
import { HeaderComponent } from './header/header/header.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { EmployeeComponent } from './modules/employee/employee.component';
import { JobPositionComponent } from './modules/job-position/job-position.component';
import { EmployeeLeaveComponent } from './modules/employee-leave/employee-leave.component';

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    EditComponent,
    GridComponent,
    ClientComponent,
    EmployeeComponent,
    JobPositionComponent,
    EmployeeLeaveComponent,
    HeaderComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
