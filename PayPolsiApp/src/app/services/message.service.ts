import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageComponent } from '../common/message/message.component';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private snackBar: MatSnackBar) {}

  Title: string = '';

  showMessage(message: string) {
    this.Title = '';
    this.Title = message;
    this.snackBar.openFromComponent(MessageComponent, {
      duration: 2000,
      horizontalPosition:'end',
      verticalPosition:'bottom',
      panelClass:['snack']
    });
  }
}
