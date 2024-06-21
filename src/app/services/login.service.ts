import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UserDTO } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  http = inject(HttpClient);

  getAll() {
    return this.http.get<UserDTO[]>('/api/login');    
  }

  getOne(id: number) {
    return this.http.get<UserDTO>('/api/login/' + id);    
  }

  create(user: UserDTO) {
    return this.http.post<UserDTO>('/api/login', user);
  }

  update(user: UserDTO) {
    return this.http.put<UserDTO>('/api/login', user);
  }

  delete(id: number) {
    return this.http.delete('/api/login/' + id); 
  }
}