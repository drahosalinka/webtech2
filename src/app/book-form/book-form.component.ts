import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BookDTO } from '../../../models';
import { BookService } from '../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Status } from '../../../server/status.enum';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent implements OnInit {
  formBuilder = inject(FormBuilder);

  bookService = inject(BookService);

  router = inject(Router);

  activedRoute = inject(ActivatedRoute);

  bookForm = this.formBuilder.group<BookDTO>({
    id: 0,
    ISBN: '',
    title: '',
    author: '',
    publisher: '',
    yearOfPublishing: 0,
    state: Status.Free,
  });

  isNewBook = true;

  ngOnInit(): void {
    const id = this.activedRoute.snapshot.params['id'];
    
    if (id) {
      this.isNewBook = false;
      this.bookService.getOne(id).subscribe({
        next: (book) => this.bookForm.setValue(book),
        error: (err) => {
          // TODO: notification
          console.error(err);
        }
      });
    }
  }

  saveBook() {
    const book = this.bookForm.value as BookDTO;

    if (this.isNewBook) {
      this.bookService.create(book).subscribe({
        next: () => {
          // TODO: notification
          this.router.navigateByUrl('/book');
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
    else {
      this.bookService.update(book).subscribe({
        next: () => {
          // TODO: notification
          this.router.navigateByUrl('/book');
        },
        error: (err) => {
          console.error(err);
        }
      });
    }

    
  }
}
