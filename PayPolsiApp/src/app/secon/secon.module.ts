import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeconRoutingModule } from './secon-routing.module';
import { ReadGridComponent } from './Components/read-grid/read-grid.component';
import { DataGridComponent } from './Components/data-grid/data-grid.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ReactiveFormsModule } from '@angular/forms';
import { PDFModule } from '@progress/kendo-angular-grid';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { MatButtonModule } from '@angular/material/button';
import { CommanModule } from '../common/comman/comman.module';

@NgModule({
  declarations: [
    ReadGridComponent,
    DataGridComponent,
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    SeconRoutingModule,
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
    MatButtonModule,
    GridModule,
    CommanModule
  ],
})
export class SeconModule {}
