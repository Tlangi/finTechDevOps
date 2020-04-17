import { Routes } from '@angular/router';
import {TeamsComponent} from '../../pages/teams/teams.component';
import {ArchitectureComponent} from '../../pages/architecture/architecture.component';
import {AdminComponent} from '../../pages/admin/admin.component';
import {ProjectsComponent} from '../../pages/projects/projects.component';
import {InfrastructureComponent} from '../../pages/infrastructure/infrastructure.component';
import {PageNotFoundComponent} from '../../pages/page-not-found/page-not-found.component';
import {ContactUsComponent} from '../../pages/contact-us/contact-us.component';
import {DashboardComponent} from '../../pages/dashboard/dashboard.component';

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
    path: 'contactUs',
    component: ContactUsComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
];
