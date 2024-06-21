import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'library-app';
  router = inject(Router);

  static isLoggedIn = false;

  signOut() {
    AppComponent.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
