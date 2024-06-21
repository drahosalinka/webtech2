import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserDTO } from '../../../models';
import { LoginService } from '../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';

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
    
  }

  login() {
    const userName = this.loginForm.value.userName as string;
    const password = this.loginForm.value.password as string;
    let currentUser;

    if (userName) {
      this.unknownUser = false;
      this.loginService.getOne(userName).subscribe({
        next: (user) => {
          currentUser = user;
          if(user.password == password) {
            this.router.navigate(['/book']);
            AppComponent.isLoggedIn = true;
          }
         },
        error: (err) => {
          // TODO: notification
          console.error(err);
        }
      })
    }
    
  }
}
