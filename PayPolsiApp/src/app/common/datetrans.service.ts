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


  TransForm(str:string){
    let day:number = parseInt(str.slice(0,2));
    let month:number = parseInt(str.slice(3,5)) - 1;
    let year:number = parseInt(str.slice(6,10));
    // return this.getDate(new Date(year,month,day));
    return new Date(year,month,day);
  }
}
