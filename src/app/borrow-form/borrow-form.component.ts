import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BorrowService } from '../services/borrow.service';
import { BorrowBookDTO, CustomerDTO, BookDTO } from '../../../models';
import { CustomerService } from '../services/customer.service';
import { BookService } from '../services/book.service';
import { Status } from '../../../server/status.enum';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-borrow-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './borrow-form.component.html',
  styleUrl: './borrow-form.component.css'
})
export class BorrowFormComponent implements OnInit {
  borrowService = inject(BorrowService);

  router = inject(Router);

  customerService = inject(CustomerService);
  bookService = inject(BookService);

  formBuilder = inject(FormBuilder);

  customers: CustomerDTO[] = [];
  books: BookDTO[] = [];

  borrowForm = this.formBuilder.group<BorrowBookDTO>({
    id: 0,
    timestamp: '',
    customer: null,
    book: null,
    days: 0
  });

  ngOnInit(): void {
    if(!AppComponent.isLoggedIn) {
      this.router.navigateByUrl('/login');
      alert(`Jelentkezz be!`);
    }
    this.customerService.getAll().subscribe((customers) => this.customers = customers);
    this.bookService.getAll().subscribe((books) => this.books = books);
  }

  createBorrow() {
    const borrow = this.borrowForm.value as BorrowBookDTO;
    const book = borrow.book as BookDTO;
    book.state = Status.InUse;

    this.borrowService.create(borrow).subscribe({
      next: () => {
        // TODO: notification
        this.router.navigateByUrl('/return');
      },
      error: (err) => {
        console.error(err);
      }});
    this.bookService.update(book).subscribe(book => { console.log(book); });
  }

  getFreeBooks(): any[] {
    return this.books.filter(book => book.state === 'szabad');
  }
}