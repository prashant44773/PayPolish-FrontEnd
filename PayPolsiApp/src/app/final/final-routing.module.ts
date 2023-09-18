import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataGridComponent } from './Components/data-grid/data-grid.component';
import { ReadGridComponent } from './Components/read-grid/read-grid.component';

const routes: Routes = [
  {path:'' , redirectTo:'final/entry' ,pathMatch:'full'},
  {path:'final/entry',component:DataGridComponent},
  {path:'final/read',component:ReadGridComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinalRoutingModule { }
