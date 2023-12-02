import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SearchbarComponent
  ],
  imports: [
    CommonModule,
    DateInputsModule,
    ReactiveFormsModule
  ],
  exports:[SearchbarComponent]
})
export class CommanModule { }
