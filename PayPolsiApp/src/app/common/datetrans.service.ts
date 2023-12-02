import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { eyeSlashIcon } from '@progress/kendo-svg-icons';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatetransService {
  constructor(private datepipe: DatePipe) {}

  activeCellFormGroup: FormGroup = new FormGroup({});
  argsUpdate: any;

  getDate(str: any) {
    return this.datepipe.transform(str, 'dd-MM-yyyy');
  }

  TransForm(str: string) {
    let day: number = parseInt(str.slice(0, 2));
    let month: number = parseInt(str.slice(3, 5)) - 1;
    let year: number = parseInt(str.slice(6, 10));
    // return this.getDate(new Date(year,month,day));
    return new Date(year, month, day);
  }

  // Validation Function For Entered Data

  isValidEntries(DataForm: FormGroup) {
    let keys: any[] = Object.keys(DataForm.value);
    let values: any[] = Object.values(DataForm.value);

    let index: number = 0,
      valid: boolean = true;
    keys.map((res: any) => {
      if (res == 'id' || res == 'date' || res == 'type') {
      } else {
        if (!isNaN(values[index])) {
        } else {
          valid = false;
        }
      }
      index++;
    });
    return valid;
  }

  // Global Search Based On Date

  public search = new Subject<any>();
  public searchMessage$ = this.search.asObservable();

  searchCall(message: any) {
    this.search.next(message);
  }

  // Search Filter Function Based On Date

  FilterLocalDate(data: any[], date: Date) {
    let filtered: any[] = [];
    data.map((res: any) => {
      let test: Date = new Date(res.date);
      if (
        test.getDate() == date.getDate() &&
        test.getMonth() == date.getMonth() &&
        test.getFullYear() == date.getFullYear()
        ) {
          filtered.push(res);
        }
      });
      return filtered;
    }
}
