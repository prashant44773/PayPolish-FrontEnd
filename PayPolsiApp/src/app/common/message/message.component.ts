import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit{
  
  constructor(private notifyData : MessageService){}

  ngOnInit(): void {
      this.Message = this.notifyData.Title;
  }

  
  Message:string = "";
}
