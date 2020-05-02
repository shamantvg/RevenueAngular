import { BrowserModule } from '@angular/platform-browser';
import * as $ from "jquery";
import { NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PageNotfoundComponent } from './page-notfound/page-notfound.component';
import { IndexPageComponent } from './index-page/index-page.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DataTablesModule } from 'angular-datatables';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AgGridModule } from 'ag-grid-angular';

import { AngularMaterialModule } from './angular-material.module';
import { AuthGuard } from './auth.guard';
import {TokenInterceptorService} from './token-interceptor.service'
import { EventService } from 'ag-grid-community';
import { BnNgIdleService } from 'bn-ng-idle';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PageNotfoundComponent,
    IndexPageComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    AngularMaterialModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DateTimePickerModule,
    DataTablesModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    AgGridModule.withComponents([]),
    MDBBootstrapModule.forRoot()
  ],
  providers: [BnNgIdleService,AuthGuard,AuthGuard,EventService,
  {
    provide : HTTP_INTERCEPTORS,
    useClass : TokenInterceptorService,
    multi : true
  }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
