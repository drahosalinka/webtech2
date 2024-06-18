import { Component, OnInit, inject } from '@angular/core';
import { BookService } from '../services/book.service';
import { BookDTO } from '../../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
  bookService = inject(BookService);

  router = inject(Router);

  books: BookDTO[] = [];

  ngOnInit(): void {
    this.bookService.getAll().subscribe({
      next: books => this.books = books,
      error: err => console.error(err)
    });
  }

  goToBookForm(id: number) {
    this.router.navigate([ '/edit-book', id ]);
  }

  deleteBook(book: BookDTO) {
    this.bookService.delete(book.id).subscribe({
      next: () => {
        const index = this.books.indexOf(book);
        if (index > -1) {
          this.books.splice(index, 1);
        }
      },
      error: (err) => {
        // TODO: notification
        console.error(err);
      }
    });
  }
}
