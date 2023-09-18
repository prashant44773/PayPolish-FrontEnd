import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { DataGridComponent } from './Components/data-grid/data-grid.component';
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { DialogModule } from "@progress/kendo-angular-dialog";
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { LabelModule } from "@progress/kendo-angular-label";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { ReactiveFormsModule } from '@angular/forms';
import { ReadGridComponent } from './Components/read-grid/read-grid.component';
import { PDFModule } from "@progress/kendo-angular-grid";
import { NavbarComponent } from './Components/navbar/navbar.component';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LayoutModule } from "@progress/kendo-angular-layout";
import {MatButtonModule} from '@angular/material/button';
import { FooterComponent } from './Components/footer/footer.component';



@NgModule({
  declarations: [
    DataGridComponent,
    ReadGridComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    DropDownsModule,
    DialogModule,
    DateInputsModule,
    LabelModule,
    InputsModule,
    ButtonsModule,
    ReactiveFormsModule,
    PDFModule,
    MatIconModule,
    MatToolbarModule,
    LayoutModule,
    MatButtonModule
  ]
})
export class MainModule { }
