import { Component, OnInit, inject } from '@angular/core';
import { BorrowService } from '../services/borrow.service';
import { BorrowBookDTO, BookDTO } from '../../../models';
import { Router } from '@angular/router';
import { Status } from '../../../server/status.enum';
import {BookService } from '../services/book.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-return',
  standalone: true,
  imports: [],
  templateUrl: './return.component.html',
  styleUrl: './return.component.css'
})
export class ReturnComponent implements OnInit {
  borrowService = inject(BorrowService);
  bookService = inject(BookService);


  router = inject(Router);

  borrows: BorrowBookDTO[] = [];
  
  ngOnInit(): void {
    console.log(AppComponent.isLoggedIn);
    if(!AppComponent.isLoggedIn) {
      this.router.navigateByUrl('/login');
      alert(`Jelentkezz be!`);
    }
    this.borrowService.getAll().subscribe({
      next: borrows => this.borrows = borrows,
      error: err => console.error(err)
    });
  }

  goToBorrowForm(id: number) {
    this.router.navigate([ '/borrow', id ]);
  }

  deleteBorrow(borrow: BorrowBookDTO) {
    this.borrowService.delete(borrow.id).subscribe({
      next: () => {
        const index = this.borrows.indexOf(borrow);
        if (index > -1) {
          this.borrows.splice(index, 1);
        }
      },
      error: (err) => {
        // TODO: notification
        console.error(err);
      }
    });
  }

 openReturn(borrow: BorrowBookDTO) {
    // Megjeleníthetünk egy felugró ablakot itt
    const isDamaged = confirm('A könyv sérült?');
    const price = isDamaged ? (5000) : (0);

    // Az eredmény megjelenítése (csak példa)
    alert(`Fizetendő: ${price}`);

    const book = borrow.book as BookDTO;
    if (isDamaged) {
      book.state = Status.Scrapped;
    } else {
      book.state = Status.Free;
    }

    this.borrowService.delete(borrow.id).subscribe({
      next: () => {
      const index = this.borrows.indexOf(borrow);
      if (index > -1) {
        this.borrows.splice(index, 1);
      } 
    }
    });
    this.bookService.update(book).subscribe(book => { console.log(book); });
  }
}
