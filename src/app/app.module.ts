import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { BookFormComponent } from './book-form/book-form.component';
import { BookListComponent } from './book-list/book-list.component';
import { BorrowFormComponent } from './borrow-form/borrow-form.component';
import { ReturnComponent } from './return/return.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppComponent,
    CustomerFormComponent,
    CustomerListComponent,
    BookFormComponent,
    BookListComponent,
    BorrowFormComponent,
    ReturnComponent,
    LoginComponent
  ]
})
export class AppModule { }
