import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { VehicleDTO } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  http = inject(HttpClient);

  getAll() {
    return this.http.get<VehicleDTO[]>('/api/vehicle');    
  }

  getOne(id: number) {
    return this.http.get<VehicleDTO>('/api/vehicle/' + id);    
  }

  create(vehicle: VehicleDTO) {
    return this.http.post<VehicleDTO>('/api/vehicle', vehicle);
  }

  update(vehicle: VehicleDTO) {
    return this.http.put<VehicleDTO>('/api/vehicle', vehicle);
  }

  delete(id: number) {
    return this.http.delete('/api/vehicle/' + id); 
  }
}