import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class MessageComponent implements OnInit{

  constructor(private notifyData : MessageService){}

  ngOnInit(): void {
      this.Message = this.notifyData.Title;
      this.customClass = this.notifyData.msgType;
  }


  Message:string = "";
  customClass:string = "";

}
