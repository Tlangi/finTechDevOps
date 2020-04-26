import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminLayoutComponent} from './adminLayout/admin-layout/admin-layout.component';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './authentication/login/login.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {TeamsComponent} from './pages/teams/teams.component';
import {ProjectsComponent} from './pages/projects/projects.component';
import {ArchitectureComponent} from './pages/architecture/architecture.component';
import {InfrastructureComponent} from './pages/infrastructure/infrastructure.component';
import {AdminComponent} from './pages/admin/admin.component';
import {ContactUsComponent} from './pages/contact-us/contact-us.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {AuthenticationGuardService} from './authentication/services/authentication-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthenticationGuardService]
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
    ],
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {})
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
