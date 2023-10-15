import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatetransService {

  constructor(private datepipe : DatePipe) { }


  getDate(str:any){
    return this.datepipe.transform(str,"dd-MM-yyyy");
  }
}
