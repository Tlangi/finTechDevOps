import { NgModule} from '@angular/core';

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
import { RegisterUserComponent } from './authentication/register-user/register-user.component';
import { ChangePasswordComponent } from './authentication/change-password/change-password.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import {ForgotPasswordComponent} from './authentication/forgot-password/forgot-password.component';

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
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        AlertComponent,
        DialogComponent,
        PopupDailogComponent,
        LoginPageComponent,
        RegisterUserComponent,
        ChangePasswordComponent,
        ResetPasswordComponent,
      ForgotPasswordComponent,
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
})
export class AppModule { }
