import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {PurchaseService} from "../services/purchase.service";
import {BookService} from "../services/book.service";
import {AuthenticationService} from "../services/authentication.service";
import {DomSanitizer} from '@angular/platform-browser';
import {ReportService} from "../services/report.service";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  reportUrl = 'http://localhost:8080/report/api/generate-report';

  constructor(private authenticationService: AuthenticationService,
              private bookService: BookService,
              private purchaseService: PurchaseService,
              private http: HttpClient,
              private router: Router,
              private sanitizer: DomSanitizer,
              private reportService: ReportService // Inject the updated service
              ) {

  }
  /*getSanitizedURL() {
    return this.sanitizer.bypassSecurityTrustUrl(this.reportUrl);
  }*/

  ngOnInit(): void {
  }

  generateReport() {
    this.http.get(this.reportUrl).subscribe(     //HTTP request to trigger report generation on the backend

      (response) => {
        console.log('Report generated successfully');
        this.router.navigate(['/report-viewer']);
      },
      (error) => {
        console.error('Error generating report', error);
      }
    );
    //this.router.navigate(['/report']); //deneme
  }
  /*generateReport() {
    this.reportService.generateReport().subscribe(
        (response) => {
          const blob = new Blob([response], {type: 'application/pdf'});
          const url = window.URL.createObjectURL(blob);

          window.open(url, '_blank');
        },
        (error) => {
          console.error('Error generating report', error);
        }
    );
  }
*/
}

