import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AdminLayoutComponent} from './adminLayout/admin-layout/admin-layout.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {ErrorInterceptorService} from './authentication/services/error-interceptor.service';
import {JwtInterceptorService} from './authentication/services/jwt-interceptor.service';
import {fakeBackendProvider} from './authentication/services/fake-backend-interceptor';
import {AlertComponent} from './helpers/components/alert/alert.component';
import {AdminLayoutModule} from './adminLayout/admin-layout/admin-layout.module';
import { DialogComponent } from './helpers/components/dialog/dialog.component';
import { PopupDailogComponent } from './helpers/components/popup-dailog/popup-dailog.component';
import { LoginPageComponent } from './authentication/login-page/login-page.component';
import {MaterialModule} from './helpers/material.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { RegisterUserComponent } from './authentication/register-user/register-user.component';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        AdminLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
        AppRoutingModule,
        MaterialModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        AlertComponent,
        DialogComponent,
        PopupDailogComponent,
        LoginPageComponent,
        RegisterUserComponent
    ],
    entryComponents: [
        DialogComponent,
        PopupDailogComponent
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true},
        fakeBackendProvider
    ],
    bootstrap: [AppComponent],
    //  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
