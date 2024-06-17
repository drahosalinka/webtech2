import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CustomerDTO } from '../../../models';
import { CustomerService } from '../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css'
})
export class CustomerFormComponent implements OnInit {
  formBuilder = inject(FormBuilder);

  customerService = inject(CustomerService);

  router = inject(Router);

  activedRoute = inject(ActivatedRoute);

  customerForm = this.formBuilder.group<CustomerDTO>({
    id: 0,
    customerId: '',
    name: '',
    address: '',
    phone: '',
    libraryCard: ''
  });

  isNewCustomer = true;

  ngOnInit(): void {
    const id = this.activedRoute.snapshot.params['id'];

    if (id) {
      this.isNewCustomer = false;
      this.customerService.getOne(id).subscribe({
        next: (customer) => this.customerForm.setValue(customer),
        error: (err) => {
          // TODO: notification
          console.error(err);
        }
      });
    }
  }

  saveCustomer() {
    const customer = this.customerForm.value as CustomerDTO;

    if (this.isNewCustomer) {
      this.customerService.create(customer).subscribe({
        next: () => {
          // TODO: notification
          this.router.navigateByUrl('/customer');
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
    else {
      this.customerService.update(customer).subscribe({
        next: () => {
          // TODO: notification
          this.router.navigateByUrl('/customer');
        },
        error: (err) => {
          console.error(err);
        }
      });
    }

    
  }
}
