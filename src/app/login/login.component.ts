import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserDTO } from '../../../models';
import { LoginService } from '../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  formBuilder = inject(FormBuilder);

  loginService = inject(LoginService);

  router = inject(Router);

  activedRoute = inject(ActivatedRoute);

  loginForm = this.formBuilder.group<UserDTO>({
    id: 0,
    userName: '',
    password: ''
  });

  unknownUser = true;

  ngOnInit(): void {
    const id = this.activedRoute.snapshot.params['id'];

    if (id) {
      this.unknownUser = false;
      this.loginService.getOne(id).subscribe({
        next: (user) => this.loginForm.setValue(user),
        error: (err) => {
          // TODO: notification
          console.error(err);
        }
      });
    }
  }

  login() {
    

    
  }
}
