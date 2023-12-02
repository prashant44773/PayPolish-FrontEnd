import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DatetransService } from '../../datetrans.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {

  constructor(private dateServ : DatetransService){
  }

  DateForm:FormGroup = new FormGroup({
    search : new FormControl(null)
  });

  Change(){
    this.dateServ.searchCall(this.DateForm.get(["search"])?.value);
  }
}
