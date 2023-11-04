import { Component, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  AddEvent,
  EditEvent,
  RemoveEvent,
  CancelEvent,
  GridComponent,
  SaveEvent,
  CellClickEvent,
  CellCloseEvent,
  RowClassArgs,
} from '@progress/kendo-angular-grid';
import { MessageService } from '../../../services/message.service';
import { Master } from 'src/app/Models/MasterModel';
import { LoaderService } from 'src/app/services/loader.service';
import { FinalService } from 'src/app/services/final.service';
import { CreateFormGroupArgs } from '@progress/kendo-angular-grid';
import { DatetransService } from 'src/app/common/datetrans.service';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css'],
})
export class DataGridComponent {
  constructor(
    private api: FinalService,
    private spinner: LoaderService,
    private notify: MessageService,
    public datepipe: DatetransService
  ) {}

  ngOnInit(): void {
    this.GetMasterDetails();
  }

  // Show Msg ON Initial Load
  isInitialLoad: boolean = true;

  // Footer Values'
  FooterIssue: number = 0;
  FooterLoss: number = 0;
  FooterFine: number = 0;

  isNew: boolean = false;

  public gridData: Master[] = [];

  DataForm: FormGroup = new FormGroup({});

  public addHandler(args: AddEvent): void {
    this.isNew = true;
    this.DataForm.reset();

    this.DataForm = new FormGroup({
      id: new FormControl(0, []),
      date: new FormControl(new Date(new Date().toDateString()), [
        Validators.required,
      ]),
      type: new FormControl(null, [Validators.required]),
      fine: new FormControl(null, []),
      issue: new FormControl(null, [Validators.required]),
      loss: new FormControl(null, []),
      pick: new FormControl(null, [Validators.required]),
      touch: new FormControl(null, [Validators.required]),
      recieve: new FormControl(null, [Validators.required]),
    });

    args.sender.addRow(this.DataForm);
  }

  protected editHandler(args: EditEvent): void {
    this.isNew = false;
    this.DataForm = new FormGroup({
      id: new FormControl(args.dataItem.id, []),
      date: new FormControl(new Date(args.dataItem.date), [
        Validators.required,
      ]),
      type: new FormControl(args.dataItem.type, [Validators.required]),
      fine: new FormControl(args.dataItem.fine, []),
      issue: new FormControl(args.dataItem.issue, [Validators.required]),
      loss: new FormControl(args.dataItem.loss, []),
      pick: new FormControl(args.dataItem.pick, [Validators.required]),
      touch: new FormControl(args.dataItem.touch, [Validators.required]),
      recieve: new FormControl(args.dataItem.recieve, [Validators.required]),
      // other fields
    });

    args.sender.editRow(args.rowIndex, this.DataForm);
  }

  public removeHandler(args: RemoveEvent): void {
    this.isNew = false;

    let Body: Master = {
      id: args.dataItem.id,
      date: args.dataItem.date,
      type: args.dataItem.type,
      recieve: args.dataItem.recieve,
      issue: args.dataItem.issue,
      loss: args.dataItem.loss,
      // loss: args.dataItem.recieve - args.dataItem.issue,
      pick: args.dataItem.pick,
      touch: args.dataItem.touch,
      fine: args.dataItem.fine,
      // fine: ((args.dataItem.recieve - args.dataItem.issue)*args.dataItem.touch)/100,
      createdOn: args.dataItem.createdOn,
      isdeleted: args.dataItem.isdeleted,
    };

    this.spinner.showLoader();
    this.api.RemoveMasterData(Body).subscribe((res: any) => {
      if (res) {
        // this.GetMasterDetails();
        this.notify.showSuccessMsg('Record Deleted !');
      } else {
        // this.GetMasterDetails();
        this.notify.showErrorMsg('Some Error Ocuured ! Operation Failed.');
      }
      this.gridData = [];
      this.GetMasterDetails();
    });
    this.closeNewRecordAfterSave(args);
    this.spinner.hideLoader();
  }

  public cancelHandler(args: CancelEvent): void {
    // close the editor for the given row
    this.isNew = false;
    this.closeEditor(args.sender, args.rowIndex);
  }

  private closeEditor(grid: GridComponent, rowIndex: number) {
    // close the editor
    grid.closeRow(rowIndex);
  }

  public saveHandler(args: SaveEvent): void {
    // this.spinner.showLoader();

    if (this.DataForm.invalid) {
      this.notify.showWarningMsg('Entered Details is not Valid');
      return;
    }

    if (this.isNew) {
      let Body: Master = {
        id: args.dataItem.id,
        date: new Date(args.dataItem.date).toDateString().toString(),
        type: args.dataItem.type,
        // Number(parseFloat(args.dataItem.issue).toFixed(3))
        issue: Number(parseFloat(args.dataItem.issue).toFixed(3)),
        // loss: args.dataItem.loss,
        loss:
          Number(parseFloat(args.dataItem.recieve).toFixed(3)) -
          Number(parseFloat(args.dataItem.issue).toFixed(3)),
        pick: Number(parseFloat(args.dataItem.pick).toFixed(3)),
        touch: Number(parseFloat(args.dataItem.touch).toFixed(3)),
        recieve: Number(parseFloat(args.dataItem.recieve).toFixed(3)),
        // fine: args.dataItem.fine,
        fine:
          ((Number(parseFloat(args.dataItem.recieve).toFixed(3)) -
            Number(parseFloat(args.dataItem.issue).toFixed(3))) *
            Number(parseFloat(args.dataItem.touch).toFixed(3))) /
          100,
        createdOn: Date.now().toString(),
        isdeleted: false,
      };

      this.spinner.showLoader();
      this.api.AddMasterData(Body).subscribe((res: any) => {
        if (res) {
          this.notify.showSuccessMsg('New Record Added !');
        } else {
          this.notify.showErrorMsg('Some Error Ocuured ! Operation Failed.');
        }
        this.gridData = [];
        this.GetMasterDetails();
      });
      this.spinner.hideLoader();
      this.isNew = false;
    } else {
      let Body: Master = {
        id: args.dataItem.id,
        date: new Date(args.formGroup.get(['date'])?.value)
          .toDateString()
          .toString(),
        type: args.formGroup.get(['type'])?.value,
        issue: Number(
          parseFloat(args.formGroup.get(['issue'])?.value).toFixed(3)
        ),
        // loss: args.dataItem.loss,
        loss:
          Number(
            parseFloat(args.formGroup.get(['recieve'])?.value).toFixed(3)
          ) -
          Number(parseFloat(args.formGroup.get(['issue'])?.value).toFixed(3)),
        pick: Number(
          parseFloat(args.formGroup.get(['pick'])?.value).toFixed(3)
        ),
        touch: Number(
          parseFloat(args.formGroup.get(['touch'])?.value).toFixed(3)
        ),
        recieve: Number(
          parseFloat(args.formGroup.get(['recieve'])?.value).toFixed(3)
        ),
        // fine: args.dataItem.fine,
        fine:
          ((Number(
            parseFloat(args.formGroup.get(['recieve'])?.value).toFixed(3)
          ) -
            Number(
              parseFloat(args.formGroup.get(['issue'])?.value).toFixed(3)
            )) *
            Number(
              parseFloat(args.formGroup.get(['touch'])?.value).toFixed(3)
            )) /
          100,
        createdOn: Date.now().toString(),
        isdeleted: false,
      };

      this.spinner.showLoader();
      this.api.EditMasterData(Body).subscribe((res: any) => {
        if (res) {
          this.notify.showInfoMsg('Current Record Updated !');
        } else {
          this.notify.showErrorMsg('Some Error Ocuured ! Operation Failed.');
        }
        this.gridData = [];
        this.GetMasterDetails();
      });
      this.spinner.hideLoader();
    }
    this.closeEditor(args.sender, args.rowIndex);

    // Close New Add Row
    this.closeNewRecordAfterSave(args);
    // this.spinner.hideLoader();
  }

  // Footer Values
  FooterValues() {
    this.gridData.forEach((res: any) => {
      this.FooterFine = Number(
        parseFloat(this.FooterFine + res.fine).toFixed(3)
      );
      this.FooterLoss = Number(
        parseFloat(this.FooterLoss + res.loss).toFixed(3)
      );
      this.FooterIssue = Number(
        parseFloat(this.FooterIssue + res.issue).toFixed(3)
      );
    });
  }

  ResetFooterValues() {
    this.FooterFine = 0;
    this.FooterLoss = 0;
    this.FooterIssue = 0;
  }

  // Data Access Methods

  GetMasterDetails() {
    this.spinner.showLoader();
    this.api.GetMasterData().subscribe((res: any) => {
      let count = 0;
      res.forEach((val: any) => {
        // res[count].date = new Date(res[count].date).toDateString();
        // res[count].date = this.datepipe.TransForm(res[count].date);
        count++;
      });
      if (res[0].id > 0) {
        this.spinner.hideLoader();
        if (this.isInitialLoad) {
          this.notify.showInfoMsg('Your Data is Loaded !');
          this.isInitialLoad = false;
        }
      } else {
        this.spinner.hideLoader();
        this.notify.showWarningMsg(
          'Your Data Store is Empty ! Add Some Records.'
        );
      }
      this.gridData = res;
      this.ResetFooterValues();
      this.FooterValues();
    });
    this.spinner.hideLoader();
  }

  // In Cell Editng For Random Editing

  public cellClickHandler(args: CellClickEvent) {
    // this.DataForm
    this.isNew = false;
    this.DataForm = new FormGroup({
      id: new FormControl(args.dataItem.id, []),
      date: new FormControl(new Date(args.dataItem.date), [
        Validators.required,
      ]),
      type: new FormControl(args.dataItem.type, [Validators.required]),
      fine: new FormControl(args.dataItem.fine, []),
      issue: new FormControl(args.dataItem.issue, [Validators.required]),
      loss: new FormControl(args.dataItem.loss, []),
      pick: new FormControl(args.dataItem.pick, [Validators.required]),
      touch: new FormControl(args.dataItem.touch, [Validators.required]),
      recieve: new FormControl(args.dataItem.recieve, [Validators.required]),
      // other fields
    });

    args.sender.editCell(args.rowIndex, args.columnIndex, this.DataForm);
  }

  public cellCloseHandler(args: CellCloseEvent) {
    this.isNew = false;
    this.saveHandler(args);
  }

  KeyBoardEvents(e: any, grid: GridComponent) {
    if (e.keyCode == 43) {
      // NumPad + , For Adding New Record
      this.isNew = true;
      this.DataForm = new FormGroup({
        id: new FormControl(0, []),
        date: new FormControl(new Date(new Date().toDateString()), [
          Validators.required,
        ]),
        type: new FormControl(null, [Validators.required]),
        fine: new FormControl(null, []),
        issue: new FormControl(null, [Validators.required]),
        loss: new FormControl(null, []),
        pick: new FormControl(null, [Validators.required]),
        touch: new FormControl(null, [Validators.required]),
        recieve: new FormControl(null, [Validators.required]),
      });
      grid.addRow(this.DataForm);
    }

    // NumpadMultiply , For Saving Record
    if (e.keyCode == 42) {
      let dt: SaveEvent = {
        dataItem: this.DataForm.value,
        isNew: true,
        formGroup: this.DataForm,
        sender: grid,
        rowIndex: 0,
      };
      this.isNew = true;
      this.saveHandler(dt);
    }

    // Cancel Key
    if (e.keyCode == 45) {
      let dt: CancelEvent = {
        dataItem: this.DataForm.value,
        isNew: true,
        formGroup: this.DataForm,
        sender: grid,
        rowIndex: -1,
      };
      this.cancelHandler(dt);
    }

    // Delete Key , ` (BackQuote)
    if (e.keyCode == 96) {
      let dt: RemoveEvent = {
        dataItem: grid.activeCell.dataItem,
        isNew: true,
        // formGroup: this.DataForm,
        sender: grid,
        rowIndex: grid.activeCell.rowIndex,
      };
      this.removeHandler(dt);
    }
  }

  // Helper Functions

  // Close Add New RecordAfter Saving with Keyboard

  closeNewRecordAfterSave(args: any) {
    // Extra Logic For Closing New Field After Save through KeyBoard
    let fireEvent: CancelEvent = args;
    // fireEvent.rowIndex = -1;
    fireEvent.rowIndex = args.sender.activeCell.rowIndex-1;
    this.cancelHandler(fireEvent);
    this.closeEditor(args.sender,-1); // Close the Row After Saving New Record
    this.DataForm.reset();
  }

  Reload(){
    this.isInitialLoad = true;
    this.GetMasterDetails();
  }
}
