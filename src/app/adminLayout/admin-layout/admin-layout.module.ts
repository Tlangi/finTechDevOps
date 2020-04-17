import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {AdminLayoutRoutes} from './admin-layout.routing';
import {AdminComponent} from '../../pages/admin/admin.component';
import {TeamsComponent} from '../../pages/teams/teams.component';
import {ArchitectureComponent} from '../../pages/architecture/architecture.component';
import {AboutUsComponent} from '../../pages/about-us/about-us.component';
import {ProjectsComponent} from '../../pages/projects/projects.component';
import {HomeComponent} from '../../pages/home/home.component';
import {InfrastructureComponent} from '../../pages/infrastructure/infrastructure.component';
import {PageNotFoundComponent} from '../../pages/page-not-found/page-not-found.component';
import {ContactUsComponent} from '../../pages/contact-us/contact-us.component';
import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {MatTabsModule} from '@angular/material/tabs';
import {FlexModule} from '@angular/flex-layout';
import {MatCardModule} from "@angular/material/card";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    MatTabsModule,
    FlexModule,
    MatCardModule,
  ],
  declarations: [
    DashboardComponent,
    AboutUsComponent,
    PageNotFoundComponent,
    ContactUsComponent,
    HomeComponent,
    AdminComponent,
    TeamsComponent,
    ProjectsComponent,
    ArchitectureComponent,
    InfrastructureComponent,
  ]
})
export class AdminLayoutModule {}
