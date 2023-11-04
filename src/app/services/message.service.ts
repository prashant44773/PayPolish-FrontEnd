import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageComponent } from '../common/message/message.component';
import { NotificationService } from '@progress/kendo-angular-notification';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private snackBar: MatSnackBar , private kendoNotify:NotificationService) {}

  Title: string = '';
  msgType: string = '';

  // showMessage(message: string) {
  //   this.Title = '';
  //   this.msgType = 'success';

  //   this.Title = message;
  //   this.snackBar.openFromComponent(MessageComponent, {
  //     duration: 2500,
  //     horizontalPosition:'end',
  //     verticalPosition:'bottom',
  //     panelClass:['snack']
  //   });
  // }

  // showError(message: string) {
  //   this.Title = '';
  //   this.msgType = 'error'; // Default Class For Error Msg
  //   this.Title = message;
  //   this.snackBar.openFromComponent(MessageComponent, {
  //     duration: 5000,
  //     horizontalPosition:'end',
  //     verticalPosition:'bottom',
  //   });
  // }


  showSuccessMsg(message: string) {
    this.kendoNotify.show({
      content: message,
      hideAfter: 3500,
      position: { horizontal: "center", vertical: "bottom" },
      animation: { type: "fade", duration: 400 },
      type: { style: "success", icon: true },
      // closable:true
    });
  }

  showWarningMsg(message: string): void {
    this.kendoNotify.show({
      content: message,
      hideAfter: 3500,
      position: { horizontal: "center", vertical: "bottom" },
      animation: { type: "fade", duration: 400 },
      type: { style: "warning", icon: true },
      // closable:true
    });
  }
  showInfoMsg(message: string): void {
    this.kendoNotify.show({
      content: message,
      hideAfter: 2500,
      position: { horizontal: "center", vertical: "bottom" },
      animation: { type: "fade", duration: 400 },
      type: { style: "info", icon: true },
      // closable:true
    });
  }
  showErrorMsg(message: string): void {
    this.kendoNotify.show({
      content: message,
      hideAfter: 5000,
      position: { horizontal: "center", vertical: "bottom" },
      animation: { type: "fade", duration: 400 },
      type: { style: "error", icon: true },
      // closable:true
    });
  }

}
