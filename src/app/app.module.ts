import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AdminLayoutComponent} from './adminLayout/admin-layout/admin-layout.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {ErrorInterceptorService} from './authentication/services/error-interceptor.service';
import {JwtInterceptorService} from './authentication/services/jwt-interceptor.service';
import {fakeBackendProvider} from './authentication/services/fake-backend-interceptor';
import {AlertComponent} from './helpers/components/alert/alert.component';
import {FlexModule} from '@angular/flex-layout';
import {AdminLayoutModule} from './adminLayout/admin-layout/admin-layout.module';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './helpers/components/dialog/dialog.component';
import { PopupDailogComponent } from './helpers/components/popup-dailog/popup-dailog.component';
import {root} from 'rxjs/internal-compatibility';
import { LoginPageComponent } from './authentication/login-page/login-page.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    AdminLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    FlexModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AlertComponent,
    DialogComponent,
    PopupDailogComponent,
    LoginPageComponent
  ],
  entryComponents: [
    DialogComponent,
    PopupDailogComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
