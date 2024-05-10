import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class ReportService {
  //private baseUrl = 'http://localhost:8080/report'; //Update with backend URL
  private baseUrl = `${environment.BASE_URL}/api/generate-report`; //Access BASE_URL from environment
  //private baseUrl = `${environment.BASE_URL}/report/api/generate-report`;

    constructor(private http: HttpClient) { }
    generateReport(): Observable<Blob> {
        return this.http.get(this.baseUrl, { responseType: 'blob' });
    }

}
