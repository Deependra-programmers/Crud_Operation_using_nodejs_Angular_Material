import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Data } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarmsgComponent } from './snackbarmsg/snackbarmsg.component';
@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  
  constructor(private _http:HttpClient, private snackBar : MatSnackBar) { }

  private _refreshNeeded = new Subject<void>();

  get RefreshNeeded(){
     return this._refreshNeeded;
  }


    //connect  node-Task and crud operation 

    apiUrlgetalldata='http://localhost:3000/post/get';
    apiUrlcreatedata='http://localhost:3000/post/create';
    apiUrldeletedata='http://localhost:3000/post/delete/';
    apiUrlupdatedata='http://localhost:3000/post/update/';
    ids:any;
    //get all data

    getAllData():Observable<any>
    {
        return this._http.get(this.apiUrlgetalldata);
    }
    //create data
    createData(data:any):Observable<any>
    {
        console.log("apidata==>",data);
        return this._http.post(this.apiUrlcreatedata,data);
    }

    //DeleteData
    DeleteData(id:any):Observable<any>{
      return this._http.delete(this.apiUrldeletedata+id)
    }

   //UpdateData
   updateData(data:any,id:number):Observable<any>{
      console.log(id,data.cost);
      return this._http.put<any>(this.apiUrlupdatedata+id,{"cost":data.cost}).pipe(
        tap(()=>{
          this.RefreshNeeded.next();
        })
      );
   }

   
  //snackbar Message 
  ShowNotification(msg:string,messaageType:'error' | 'success'){
    this.snackBar.openFromComponent(SnackbarmsgComponent,{
      data:{
        message:msg,
      },
        duration:5000,
        panelClass:messaageType
    })
  }
}
