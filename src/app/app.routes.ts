import { Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-form/book-form.component';
import { BorrowFormComponent } from './borrow-form/borrow-form.component';
import { ReturnComponent } from './return/return.component';

export const routes: Routes = [
    {
        path: 'customer',
        component: CustomerListComponent
    },
    {
        path: 'add-customer',
        component: CustomerFormComponent
    },
    {
        path: 'edit-customer/:id',
        component: CustomerFormComponent
    },
    {
        path: 'book',
        component: BookListComponent
    },
    {
        path: 'add-book',
        component: BookFormComponent
    },
    {
        path: 'edit-book/:id',
        component: BookFormComponent
    },
    {
        path: 'borrow',
        component: BorrowFormComponent
    },
    {
        path: 'return',
        component: ReturnComponent
    },
];
