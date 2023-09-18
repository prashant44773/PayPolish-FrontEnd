import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataGridComponent } from './Components/data-grid/data-grid.component';
import { ReadGridComponent } from './Components/read-grid/read-grid.component';

const routes: Routes = [
  {path:'' , redirectTo:'secon/entry' ,pathMatch:'full'},
  {path:'secon/entry',component:DataGridComponent},
  {path:'secon/read',component:ReadGridComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeconRoutingModule { }
