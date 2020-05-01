import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminComponent} from '../../pages/admin/admin.component';
import {TeamsComponent} from '../../pages/teams/teams.component';
import {ArchitectureComponent} from '../../pages/architecture/architecture.component';
import {ProjectsComponent} from '../../pages/projects/projects.component';
import {HomeComponent} from '../../pages/home/home.component';
import {InfrastructureComponent} from '../../pages/infrastructure/infrastructure.component';
import {PageNotFoundComponent} from '../../pages/page-not-found/page-not-found.component';
import {ContactUsComponent} from '../../pages/contact-us/contact-us.component';
import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {EmployeesComponent} from '../../pages/admin/employees/employees.component';
import {ApplicationsComponent} from '../../pages/admin/applications/applications.component';
import {WorkTypeComponent} from '../../pages/admin/work-type/work-type.component';
import {StatusComponent} from '../../pages/admin/status/status.component';
import {MaterialModule} from '../../helpers/material.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    DashboardComponent,
    PageNotFoundComponent,
    ContactUsComponent,
    HomeComponent,
    AdminComponent,
    TeamsComponent,
    ProjectsComponent,
    ArchitectureComponent,
    InfrastructureComponent,
    EmployeesComponent,
    ApplicationsComponent,
    WorkTypeComponent,
    StatusComponent
  ]
})
export class AdminLayoutModule {}
