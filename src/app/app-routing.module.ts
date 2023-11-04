import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Home/home/home.component';
// import { MainModule } from './main/main.module';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
  },
  {
    path: 'secon',
    loadChildren: () =>
      import('./secon/secon.module').then((s) => s.SeconModule),
  },
  {
    path: 'final',
    loadChildren: () =>
      import('./final/final.module').then((f) => f.FinalModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
