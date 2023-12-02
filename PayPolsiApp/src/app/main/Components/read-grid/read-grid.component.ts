import { Component } from '@angular/core';
import { DateModle } from 'src/app/Models/DateModel';
import { Master } from 'src/app/Models/MasterModel';
import { DatetransService } from 'src/app/common/datetrans.service';
import { ApiService } from 'src/app/services/api.service';
import { LoaderService } from 'src/app/services/loader.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-read-grid',
  templateUrl: './read-grid.component.html',
  styleUrls: ['./read-grid.component.css'],
})
export class ReadGridComponent {
  constructor(
    private api: ApiService,
    private spinner: LoaderService,
    private notify: MessageService,
    public datepipe : DatetransService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.s
    //Add 'implements OnInit' to the class.
    this.GetMasterDetails();
    // this.GetUniqueDates();
  }

  public gridData: Master[] = [];
  public UniqueDateData: Master[] = [];

  // Calculation Variables
  FooterIssue: any = 0;
  FooterLoss: any = 0;
  FooterFine: any = 0;
  // Calculation Variables

  // Data Acesss Methods

  GetMasterDetails() {
    this.spinner.showLoader();
    this.api.GetMasterData().subscribe((res: any) => {
      let count = 0;
      res.forEach((val: any) => {
        // res[count].date = new Date(res[count].date).toDateString();
        // res[count].date = this.datepipe.TransForm(res[count].date);
        count++;
      });
      this.gridData = res;
      this.GetUniqueDates();
      // console.log(res);
      if (res[0].id > 0) {
        this.spinner.hideLoader();
        this.notify.showInfoMsg('Your Data is Loaded !');
      } else {
        this.spinner.hideLoader();
        this.notify.showErrorMsg('Your Data Store is Empty ! Add Some Records.');
      }
      this.ResetFooterValues();
      this.FooterValues();
    });
    this.spinner.hideLoader();
  }

  GetUniqueDates() {
    this.spinner.showLoader();
    this.api.GetUniqueDatesData().subscribe((res: any) => {
      let count = 0;
      res.forEach((val: any) => {
        // res[count].date = new Date(res[count].date).toDateString();
        // res[count].date = this.datepipe.TransForm(res[count].date);
        count++;
      });
      if (res[0].id == 0) {
        this.spinner.hideLoader();
        this.notify.showInfoMsg('Your Data is Loaded !');
      } else {
        this.spinner.hideLoader();
        this.notify.showErrorMsg('Your Data Store is Empty ! Add Some Records.');
      }
      this.UniqueDateData = res;
    });
    this.spinner.hideLoader();
  }

  // Footer Values

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

  DateFilter(event: any) {
    console.log(event.dataItem);
    let text = event.dataItem.date;
    console.log(text);

    let Body: DateModle = {
      Current: new Date(event.dataItem.date),
      Previous: new Date().toString(),
    };

    this.ResetFooterValues();
    this.spinner.showLoader();
    this.api.FilterByDateMasterData(Body).subscribe((res: any) => {
      let count = 0;
      res.forEach((val: any) => {
        // res[count].date = new Date(res[count].date).toDateString();
        // res[count].date = this.datepipe.TransForm(res[count].date);
        count++;
      });
      this.gridData = res;
      this.FooterValues();
    });
    this.spinner.hideLoader();
  }

  MonthFilter() {
    let CurrentDate: Date = new Date();

    // Logic For Previous Date
    let year = new Date().getFullYear();
    let month = new Date().getMonth() - 1;
    let date = new Date().getDate();

    if (month == 0) {
      month = 12;
      year = year - 1;
    }

    let final = new Date(year, month, date);

    let Body: DateModle = {
      Current: CurrentDate.toDateString().toString(),
      Previous: final.toDateString().toString(),
    };

    console.log(Body);

    this.ResetFooterValues();
    this.GetUniqueDates();
    this.api.FilterMasterData(Body).subscribe((res: any) => {
      let count = 0;
      res.forEach((val: any) => {
        // res[count].date = new Date(res[count].date).toDateString();
        // res[count].date = this.datepipe.TransForm(res[count].date);
        count++;
      });
      this.gridData = res;
      this.FooterValues();
      // Reload Footer Apis Everytime Data is Changed
      // this.FooterValues();
    });

  }
}
