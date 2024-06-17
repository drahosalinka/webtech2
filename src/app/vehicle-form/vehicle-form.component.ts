import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { VehicleDTO } from '../../../models';
import { VehicleService } from '../services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Status } from '../../../server/status.enum';

@Component({
  selector: 'app-vehicle-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './vehicle-form.component.html',
  styleUrl: './vehicle-form.component.css'
})
export class VehicleFormComponent implements OnInit {
  formBuilder = inject(FormBuilder);

  vehicleService = inject(VehicleService);

  router = inject(Router);

  activedRoute = inject(ActivatedRoute);

  vehicleForm = this.formBuilder.group<VehicleDTO>({
    id: 0,
    vehicleId: '',
    type: '',
    manufacturer: '',
    chassisNumber: '',
    dateOfAcquisition: '',
    price: 0,
    km: 0,
    state: Status.Free,
  });

  isNewVehicle = true;

  ngOnInit(): void {
    const id = this.activedRoute.snapshot.params['id'];
    
    if (id) {
      this.isNewVehicle = false;
      this.vehicleService.getOne(id).subscribe({
        next: (vehicle) => this.vehicleForm.setValue(vehicle),
        error: (err) => {
          // TODO: notification
          console.error(err);
        }
      });
    }
  }

  saveVehicle() {
    const vehicle = this.vehicleForm.value as VehicleDTO;

    if (this.isNewVehicle) {
      this.vehicleService.create(vehicle).subscribe({
        next: () => {
          // TODO: notification
          this.router.navigateByUrl('/vehicle');
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
    else {
      this.vehicleService.update(vehicle).subscribe({
        next: () => {
          // TODO: notification
          this.router.navigateByUrl('/vehicle');
        },
        error: (err) => {
          console.error(err);
        }
      });
    }

    
  }
}
