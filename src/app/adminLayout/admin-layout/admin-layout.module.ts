import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';
import {AdminComponent} from '../../pages/adminFolder/admin/admin.component';
import {TeamsComponent} from '../../pages/teamsFolder/teams/teams.component';
import {ArchitectureComponent} from '../../pages/architectureFolder/architecture/architecture.component';
import {AboutUsComponent} from '../../pages/aboutUsFolder/about-us/about-us.component';
import {ProjectsComponent} from '../../pages/projectsFolder/projects/projects.component';
import {HomeComponent} from '../../pages/homeFolder/home/home.component';
import {InfrastructureComponent} from '../../pages/infrastructureFolder/infrastructure/infrastructure.component';
import {PageNotFoundComponent} from '../../pages/pageNotFoundFolder/page-not-found/page-not-found.component';
import {ContactUsComponent} from '../../pages/contactUsFolder/contact-us/contact-us.component';
import {DashboardComponent} from '../../pages/dashboardFolder/dashboard/dashboard.component';
import {MatTabsModule} from '@angular/material/tabs';
import {FlexModule} from '@angular/flex-layout';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        HttpClientModule,
        MatTabsModule,
        FlexModule,
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
