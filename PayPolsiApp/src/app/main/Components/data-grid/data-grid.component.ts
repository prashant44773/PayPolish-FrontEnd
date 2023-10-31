import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AddEvent,
  CancelEvent,
  CellClickEvent,
  CellCloseEvent,
  EditEvent,
  GridComponent,
  RemoveEvent,
  SaveEvent,
} from '@progress/kendo-angular-grid';
import { Master } from 'src/app/Models/MasterModel';
import { DatetransService } from 'src/app/common/datetrans.service';
import { ApiService } from 'src/app/services/api.service';
import { LoaderService } from 'src/app/services/loader.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css'],
  providers: [DatePipe],
})
export class DataGridComponent implements OnInit {
  constructor(
    private api: ApiService,
    private spinner: LoaderService,
    private notify: MessageService,
    public datepipe: DatetransService
  ) {}

  ngOnInit(): void {
    this.GetMasterDetails();
  }

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
      fine: new FormControl(0, []),
      issue: new FormControl(0, [Validators.required]),
      loss: new FormControl(0, []),
      pick: new FormControl(0, [Validators.required]),
      touch: new FormControl(0, [Validators.required]),
      recieve: new FormControl(0, [Validators.required]),
    });

    args.sender.addRow(this.DataForm);
  }

  protected editHandler(args: EditEvent): void {
    console.log(args);
    this.isNew = false;
    // this.DataForm;
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
    // this.editService.remove(args.dataItem);
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
        this.notify.showMessage('Record Deleted !');
      } else {
        // this.GetMasterDetails();
        this.notify.showMessage('Some Error Ocuured ! Operation Failed.');
      }
      this.gridData = [];
      this.GetMasterDetails();
    });
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
    console.log('Args FormGrouP  :- ');
    console.log(args.formGroup.get(['date'])?.value);
    console.log(args.formGroup.get(['issue'])?.value);
    console.log(args.formGroup.get(['pick'])?.value);
    console.log(args.formGroup.get(['touch'])?.value);
    console.log(args.formGroup.get(['recieve'])?.value);

    if (this.isNew) {
      let Body: Master = {
        id: args.dataItem.id,
        date: new Date(args.dataItem.date).toDateString().toString(),
        type: args.dataItem.type,
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
          this.notify.showMessage('New Record Added !');
        } else {
          this.notify.showMessage('Some Error Ocuured ! Operation Failed.');
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
          this.notify.showMessage('Current Record Updated !');
        } else {
          this.notify.showMessage('Some Error Ocuured ! Operation Failed.');
        }
        this.gridData = [];
        this.GetMasterDetails();
      });
      this.spinner.hideLoader();
    }
    this.closeEditor(args.sender, args.rowIndex);
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
        res[count].date = this.datepipe.TransForm(res[count].date);
        count++;
      });
      if (res[0].id > 0) {
        this.spinner.hideLoader();
        this.notify.showMessage('Your Data is Loaded !');
      } else {
        this.spinner.hideLoader();
        this.notify.showMessage('Your Data Store is Empty ! Add Some Records.');
      }
      console.log(res);

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
  }
}
