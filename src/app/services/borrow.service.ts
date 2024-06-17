import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BorrowVehicleDTO } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class BorrowService {

  http = inject(HttpClient);

  getAll() {
    return this.http.get<BorrowVehicleDTO[]>('/api/return');
  }

  getOne(id: number) {
    return this.http.get<BorrowVehicleDTO>('/api/return/' + id);    
  }

  create(borrow: BorrowVehicleDTO) {
    return this.http.post<BorrowVehicleDTO>('/api/return', borrow);
  }

  borrowsByCustomer(customerId: number) {
    return this.http.get<BorrowVehicleDTO[]>('/api/return/borrowed-by/' + customerId);
  }

  borrowsByVehicle(vehicleId: number) {
    return this.http.get<BorrowVehicleDTO[]>('/api/return/vehicle/' + vehicleId);
  }

  update(borrow: BorrowVehicleDTO) {
    return this.http.put<BorrowVehicleDTO>('/api/return', borrow);
  }

  delete(id: number) {
    return this.http.delete('/api/return/' + id); 
  }
}