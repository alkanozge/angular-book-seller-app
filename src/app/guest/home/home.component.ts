import { Component, OnInit } from '@angular/core';
import {Book} from "../../models/book.model";
import {faBook} from "@fortawesome/free-solid-svg-icons";
import {AuthenticationService} from "../../services/authentication.service";
import {BookService} from "../../services/book.service";
import {PurchaseService} from "../../services/purchase.service";
import {Purchase} from "../../models/purchase.model";
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {ReportService} from "../../services/report.service";
import {DomSanitizer} from "@angular/platform-browser";
import {saveAs} from "file-saver"


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  bookList: Array<Book> = [];
  faBook = faBook;
  errorMessage: string = "";
  infoMessage: string = "";



  constructor(private authenticationService: AuthenticationService,
              private bookService: BookService,
              private purchaseService: PurchaseService,
              private http: HttpClient,
              private reportService: ReportService, // Inject the new service
              private router: Router
  ) { }

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe(data => {
      this.bookList = data;
    })
  }
 generateReport(){
    this.http.get('http://localhost:8080/report/api/generate-report', { responseType: 'blob' }).subscribe(
      (response)=>{
        this.router.navigate(['/report']);
        console.log('Report generated successfully');
      },
      (error)=>{
        console.error('Error generating report', error);
      }
    );
  }
  salesReport(){
    const reportPath= 'assets/purchase.pdf';
    this.http.get(reportPath, {responseType: 'blob'}).subscribe(
      (response)=>{
        const fileName="purchase.pdf";
        saveAs(response,fileName);
        console.log('Sales report downloaded.');
      },
      (error)=>{
        console.error('Error downloading sales report', error);
      }
    );
  }

  //actual method

  downloadReport(){
    this.purchaseService.download().subscribe(result =>{
      if(result != null){
        saveAs(result,'aaa.pdf')
      }
      //console.log(result);
    })
  }

  /*downloadReport() {
    this.reportService.generateReport().subscribe((reportBlob: Blob) => {
      const blob = new Blob([reportBlob], { type: 'application/pdf' });
      saveAs(blob, 'purchase.pdf');
    });
  }*/


  /*generateReport() {
    this.reportService.generateReport().subscribe(
      (response) => {
        // Create a blob URL for the PDF
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        // Open the report in a new tab
        window.open(url, '_blank');
      },
      (error) => {
        console.error('Error generating report', error);
      }
    );
  }*/
    /*generateReport() {

        this.reportService.generateReport().subscribe(

            (response)=>{
                console.log('Report generated successfully');
            },
            (error)=>{
                console.error('Error generating report', error);
            }
        );
        this.router.navigate(['/report']);

    }*/


  purchase(item: Book) {
    if (!this.authenticationService.currentUserValue?.id) {
      this.errorMessage = 'You should log in to buy a book';
      return;
    }

    const purchase = new Purchase(this.authenticationService.currentUserValue.id, item.id, item.price);

    this.purchaseService.savePurchase(purchase).subscribe(data => {
      this.infoMessage = 'Mission is completed';
    }, err => {
      this.errorMessage = 'Unexpected error occurred.';
      console.log(err);
    });

  }

}
// import { Component, OnInit } from '@angular/core';
// import {Book} from "../../models/book.model";
// import {faBook} from "@fortawesome/free-solid-svg-icons";
// import {AuthenticationService} from "../../services/authentication.service";
// import {BookService} from "../../services/book.service";
// import {PurchaseService} from "../../services/purchase.service";
// import {Purchase} from "../../models/purchase.model";
//
// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent implements OnInit {
//
//   bookList: Array<Book> = [];
//   faBook = faBook;
//   errorMessage: string = "";
//   infoMessage: string = "";
//
//   constructor(private authenticationService: AuthenticationService,
//               private bookService: BookService,
//               private purchaseService: PurchaseService) { }
//
//   ngOnInit(): void {
//     this.bookService.getAllBooks().subscribe(data => {
//       this.bookList = data;
//     })
//   }
//
//   purchase(item: Book) {
//     if (!this.authenticationService.currentUserValue?.id) {
//       this.errorMessage = 'You should log in to buy a book';
//       return;
//     }
//
//     const purchase = new Purchase(this.authenticationService.currentUserValue.id, item.id, item.price);
//
//     this.purchaseService.savePurchase(purchase).subscribe(data => {
//       this.infoMessage = 'Mission is completed';
//     }, err => {
//       this.errorMessage = 'Unexpected error occurred.';
//       console.log(err);
//     });
//   }
//
// }
