import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Master } from '../Models/MasterModel';
import { DateModle } from '../Models/DateModel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private api :HttpClient) { }

  // Api Urls
  getMasterData:string = environment.ApiUrl + "Master/GetMasterData";
  addMasterData:string = environment.ApiUrl + "Master/AddMasterData";
  editMasterData:string = environment.ApiUrl + "Master/EditMasterData";
  removeMasterData:string = environment.ApiUrl + "Master/DeleteMasterData";
  filterMasterData:string = environment.ApiUrl + "Master/FilterMasterData";
  filterByDateMasterData:string = environment.ApiUrl + "Master/FilterMasterByDate";
  GetUniqueDetailsData:string = environment.ApiUrl + "Master/GetUniqueDate";

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
