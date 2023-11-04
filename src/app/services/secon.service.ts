import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DateModle } from '../Models/DateModel';
import { Master } from '../Models/MasterModel';

@Injectable({
  providedIn: 'root'
})
export class SeconService {

  constructor(private api :HttpClient) { }

  // Api Urls
  getMasterData:string = environment.SeconUrl + "Pre/GetMasterData";
  addMasterData:string = environment.SeconUrl + "Pre/AddMasterData";
  editMasterData:string = environment.SeconUrl + "Pre/EditMasterData";
  removeMasterData:string = environment.SeconUrl + "Pre/DeleteMasterData";
  filterMasterData:string = environment.SeconUrl + "Pre/FilterMasterData";
  filterByDateMasterData:string = environment.SeconUrl + "Pre/FilterMasterByDate";
  GetUniqueDetailsData:string = environment.SeconUrl + "Pre/GetUniqueDate";

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
