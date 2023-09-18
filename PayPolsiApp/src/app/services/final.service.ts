import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DateModle } from '../Models/DateModel';
import { Master } from '../Models/MasterModel';

@Injectable({
  providedIn: 'root'
})
export class FinalService {

  constructor(private api :HttpClient) { }

  // Api Urls
  getMasterData:string = environment.FinalUrl + "Final/GetMasterData";
  addMasterData:string = environment.FinalUrl + "Final/AddMasterData";
  editMasterData:string = environment.FinalUrl + "Final/EditMasterData";
  removeMasterData:string = environment.FinalUrl + "Final/DeleteMasterData";
  filterMasterData:string = environment.FinalUrl + "Final/FilterMasterData";
  filterByDateMasterData:string = environment.FinalUrl + "Final/FilterMasterByDate";
  GetUniqueDetailsData:string = environment.FinalUrl + "Final/GetUniqueDate";

  GetMasterData(){
    return this.api.get(this.getMasterData);
  }

  AddMasterData(Body:Master){
    return this.api.post(this.addMasterData,Body);
  }

  EditMasterData(Body:Master){
    return this.api.post(this.editMasterData,Body);
  }

  RemoveMasterData(Body:Master){
    return this.api.post(this.removeMasterData,Body);
  }

  FilterMasterData(Body:DateModle){
    return this.api.post(this.filterMasterData,Body);
  }

  FilterByDateMasterData(Body:DateModle){
    return this.api.post(this.filterByDateMasterData,Body);
  }

  GetUniqueDatesData(){
    return this.api.post(this.GetUniqueDetailsData,'');
  }
}
