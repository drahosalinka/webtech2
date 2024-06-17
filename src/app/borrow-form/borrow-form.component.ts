import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BorrowService } from '../services/borrow.service';
import { BorrowVehicleDTO, CustomerDTO, VehicleDTO } from '../../../models';
import { CustomerService } from '../services/customer.service';
import { VehicleService } from '../services/vehicle.service';
import { Status } from '../../../server/status.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-borrow-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './borrow-form.component.html',
  styleUrl: './borrow-form.component.css'
})
export class BorrowFormComponent implements OnInit {
  borrowService = inject(BorrowService);

  router = inject(Router);

  customerService = inject(CustomerService);
  vehicleService = inject(VehicleService);

  formBuilder = inject(FormBuilder);

  customers: CustomerDTO[] = [];
  vehicles: VehicleDTO[] = [];

  borrowForm = this.formBuilder.group<BorrowVehicleDTO>({
    id: 0,
    timestamp: '',
    customer: null,
    vehicle: null,
    days: 0
  });

  ngOnInit(): void {
    this.customerService.getAll().subscribe((customers) => this.customers = customers);
    this.vehicleService.getAll().subscribe((vehicles) => this.vehicles = vehicles);
  }

  createBorrow() {
    const borrow = this.borrowForm.value as BorrowVehicleDTO;
    const vehicle = borrow.vehicle as VehicleDTO;
    vehicle.state = Status.InUse;

    this.borrowService.create(borrow).subscribe({
      next: () => {
        // TODO: notification
        this.router.navigateByUrl('/return');
      },
      error: (err) => {
        console.error(err);
      }});
    this.vehicleService.update(vehicle).subscribe(vehicle => { console.log(vehicle); });
  }

  getFreeVehicles(): any[] {
    return this.vehicles.filter(vehicle => vehicle.state === 'szabad');
  }
}