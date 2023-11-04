import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoaderComponent } from '../common/loader/loader.component';
import { NoopScrollStrategy } from '@angular/cdk/overlay';


@Injectable({
  providedIn: 'root',
})
export class LoaderService {

  constructor(public dialog: MatDialog) { }

  showLoader(){
    this.dialog.open(LoaderComponent,{
        disableClose:true,
        width:'auto',
        height:'auto',
        // position:{top:'250px'}
        // panelClass:'post-dialog-container',
        // scrollStrategy: new NoopScrollStrategy()
    });
  }

  hideLoader(){
    this.dialog.closeAll();
  }
}
