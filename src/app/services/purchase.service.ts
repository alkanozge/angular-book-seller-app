import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {RequestBaseService} from "./request-base.service";
import {AuthenticationService} from "./authentication.service";
import {HttpClient} from "@angular/common/http";
import {Purchase} from "../models/purchase.model";
import {catchError, Observable} from "rxjs";
const API_URL= `${environment.BASE_URL}/api/purchase-history`
const API_URL_REPORT= `${environment.BASE_URL}/report/api/generate-report`
@Injectable({
  providedIn: 'root'
})
export class PurchaseService extends RequestBaseService{

  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService,http);
  }

  savePurchase(purchase: Purchase): Observable<any>{
    return this.http.post(API_URL, purchase, {headers: this.getHeaders});
  }

  getAllPurchaseItems(): Observable<any>{
    return this.http.get(API_URL, {headers:this.getHeaders});
  }

  download():Observable<Blob>{
    /*const convMap ={};
    params.forEach((val:string, key:any) => {
      // @ts-ignore
      convMap[key] = val;
    });*/
    debugger
    // @ts-ignore
    return this.http.get(API_URL_REPORT,{responseType:'blob'});

  }

  /*return this.http.get(API_URL_REPORT,{responseType:'blob'}).pipe(
    catchError((error: any) => {
  console.error('Error downloading file:', error);
  throw error; // Rethrow the error to propagate it to the caller
})
);*/
}
