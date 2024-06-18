import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BorrowBookDTO } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class BorrowService {

  http = inject(HttpClient);

  getAll() {
    return this.http.get<BorrowBookDTO[]>('/api/return');
  }

  getOne(id: number) {
    return this.http.get<BorrowBookDTO>('/api/return/' + id);    
  }

  create(borrow: BorrowBookDTO) {
    return this.http.post<BorrowBookDTO>('/api/return', borrow);
  }

  borrowsByCustomer(customerId: number) {
    return this.http.get<BorrowBookDTO[]>('/api/return/borrowed-by/' + customerId);
  }

  borrowsByBook(ISBN: number) {
    return this.http.get<BorrowBookDTO[]>('/api/return/book/' + ISBN);
  }

  update(borrow: BorrowBookDTO) {
    return this.http.put<BorrowBookDTO>('/api/return', borrow);
  }

  delete(id: number) {
    return this.http.delete('/api/return/' + id); 
  }
}