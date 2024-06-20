import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  signUp: any[] = [];

  signUpObject: any = {
    userName: '',
    email: '',
    password: ''
  };
  
  loginObject: any = {
    userName: '',
    password: ''
  };

}
