import {Component, Output, EventEmitter, Input} from '@angular/core';
import {Book} from "../../models/book.model";
import {BookService} from "../../services/book.service";

declare var $: any;

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {

  errorMessage: string = "";
 // book: Book=new Book();
  @Input() book: Book = new Book();
  @Output() save = new EventEmitter<any>();
  constructor(private bookService: BookService) { }

  saveBook() {
        this.bookService.saveBook(this.book).subscribe({
            next: (data) => {
              this.save.emit(data);
                $('#bookModal').modal('hide');
            },
            error: (err) => {
                this.errorMessage = 'Unexpected error occurred.';
                console.log(err);
            }
        });
    }

  showBookModal() {
    $('#bookModal').modal('show');
  }
}// import {Component, EventEmitter, Input, Output} from '@angular/core';
// import {Book} from "../../models/book.model";
// import {BookService} from "../../services/book.service";
// //$('element-selector').addClass('some-class');
//
// declare var $: any;
//
// @Component({
//   selector: 'app-book',
//   templateUrl: './book.component.html',
//   styleUrls: ['./book.component.css']
// })
// export class BookComponent {
//
//   book: Book=new Book();
//   errorMessage: string="";
//   // @Input() book: Book = new Book();
//   @Output() save = new EventEmitter<any>();
//   constructor(private bookService:BookService) {}
//     /*saveBook() {
//         this.bookService.saveBook(this.book).subscribe({
//             next: (data) => {
//               this.save.emit(data);
//                 $('#bookModal').modal('hide');
//             },
//             error: (err) => {
//                 this.errorMessage = 'Unexpected error occurred.';
//                 console.log(err);
//             }
//         });
//     }*/
//     /*saveBook() {
//         this.bookService.saveBook(this.book).subscribe(data => {
//             $('#bookModal').modal('hide');
//         }, err => {
//             this.errorMessage = 'Unexpected error occurred.';
//             console.log(err);
//         })
//     }*/
//
//   saveBook() {
//     this.bookService.saveBook(this.book).subscribe(data => {
//       this.save.emit(data);
//       $('#bookModal').modal('hide');
//     }, err => {
//       this.errorMessage = 'Unexpected error occurred.';
//       console.log(err);
//     })
//   }
//
//   showBookModal() {
//     $('#bookModal').modal('show');
//   }
// }
