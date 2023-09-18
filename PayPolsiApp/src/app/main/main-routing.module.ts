import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataGridComponent } from './Components/data-grid/data-grid.component';
import { GridModule } from "@progress/kendo-angular-grid";
import { ReadGridComponent } from './Components/read-grid/read-grid.component';


const routes: Routes = [
  {path:'' , redirectTo:'main/entry' ,pathMatch:'full'},
  {path:'main/entry',component:DataGridComponent},
  {path:'main/read',component:ReadGridComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,GridModule]
})
export class MainRoutingModule { }
