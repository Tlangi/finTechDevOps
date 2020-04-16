import { Routes } from '@angular/router';
import {TeamsComponent} from '../../pages/teamsFolder/teams/teams.component';
import {ArchitectureComponent} from '../../pages/architectureFolder/architecture/architecture.component';
import {AdminComponent} from '../../pages/adminFolder/admin/admin.component';
import {AboutUsComponent} from '../../pages/aboutUsFolder/about-us/about-us.component';
import {ProjectsComponent} from '../../pages/projectsFolder/projects/projects.component';
import {InfrastructureComponent} from '../../pages/infrastructureFolder/infrastructure/infrastructure.component';
import {PageNotFoundComponent} from '../../pages/pageNotFoundFolder/page-not-found/page-not-found.component';
import {ContactUsComponent} from '../../pages/contactUsFolder/contact-us/contact-us.component';
import {DashboardComponent} from '../../pages/dashboardFolder/dashboard/dashboard.component';

export const AdminLayoutRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'teams',
    component: TeamsComponent
  },
  {
    path: 'projects',
    component: ProjectsComponent
  },
  {
    path: 'architecture',
    component: ArchitectureComponent
  },
  {
    path: 'infrastructure',
    component: InfrastructureComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'aboutUs',
    component: AboutUsComponent,
  },
  {
    path: 'contactUs',
    component: ContactUsComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
];
