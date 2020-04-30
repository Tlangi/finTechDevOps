import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
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
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FlexModule} from '@angular/flex-layout';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        HttpClientModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        FlexModule,
        MatRadioModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
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
  ]
})
export class AdminLayoutModule {}
