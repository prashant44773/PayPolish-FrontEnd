import { FormGroup } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GridModule , PDFModule} from "@progress/kendo-angular-grid";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { LabelModule } from '@progress/kendo-angular-label';
import {ReactiveFormsModule} from '@angular/forms';
import { LoaderComponent } from './common/loader/loader.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MessageComponent } from './common/message/message.component';
import { HomeComponent } from './Home/home/home.component';
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { DatePipe } from '@angular/common';
import { ErrorInterceptor } from './common/error.interceptor';
import { NotificationModule } from '@progress/kendo-angular-notification';



@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    MessageComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    GridModule,
    HttpClientModule,
    LabelModule,
    ReactiveFormsModule,
    PDFModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    MatSnackBarModule,
    ButtonsModule,
    NotificationModule
  ],
  providers: [DatePipe , {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
