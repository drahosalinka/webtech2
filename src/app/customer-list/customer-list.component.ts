import { Component, OnInit, inject } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { CustomerDTO } from '../../../models';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit {
  customerService = inject(CustomerService);

  router = inject(Router);

  customers: CustomerDTO[] = [];

  ngOnInit(): void {
    if(!AppComponent.isLoggedIn) {
      this.router.navigateByUrl('/login');
      alert(`Jelentkezz be!`);
    }
    this.customerService.getAll().subscribe({
      next: customers => this.customers = customers,
      error: err => console.error(err)
    });
  }

  goToCustomerForm(id: number) {
    this.router.navigate([ '/edit-customer', id ]);
  }

  deleteCustomer(customer: CustomerDTO) {
    this.customerService.delete(customer.id).subscribe({
      next: () => {
        const index = this.customers.indexOf(customer);
        if (index > -1) {
          this.customers.splice(index, 1);
        }
      },
      error: (err) => {
        // TODO: notification
        console.error(err);
      }
    });
  }
}
