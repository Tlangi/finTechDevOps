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
import {DataTableComponent} from '../../pages/admin/employees/data-table/data-table.component';
import {ApplicationsTableComponent} from '../../pages/admin/applications/applications-table/applications-table.component';
import {StatusTabTableComponent} from '../../pages/admin/status/status-tab-table/status-tab-table.component';
import {WorkTypeDataTableComponent} from '../../pages/admin/work-type/work-type-data-table/work-type-data-table.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {TaskAllocationComponent} from '../../pages/teams/task-allocation/task-allocation.component';
import {TasksUpdateComponent} from '../../pages/teams/tasks-update/tasks-update.component';
import {AllocatedTasksComponent} from '../../pages/teams/allocated-tasks/allocated-tasks.component';
import {SprintComponent} from '../../pages/teams/sprint/sprint.component';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    ScrollingModule,
    MatExpansionModule,
    MatTooltipModule,
    MatSelectModule,
    MatDatepickerModule,
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
    StatusComponent,
    DataTableComponent,
    ApplicationsTableComponent,
    StatusTabTableComponent,
    WorkTypeDataTableComponent,
    TaskAllocationComponent,
    TasksUpdateComponent,
    AllocatedTasksComponent,
    SprintComponent
  ],
  exports: [
    DataTableComponent,
    ApplicationsTableComponent,
    StatusTabTableComponent,
    WorkTypeDataTableComponent,
    TasksUpdateComponent,
  ],
  entryComponents: [
    EmployeesComponent,
    ApplicationsComponent,
    WorkTypeComponent,
    StatusComponent
  ]
})
export class AdminLayoutModule {}
