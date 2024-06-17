import { Component, OnInit, inject } from '@angular/core';
import { VehicleService } from '../services/vehicle.service';
import { VehicleDTO } from '../../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.css'
})
export class VehicleListComponent implements OnInit {
  vehicleService = inject(VehicleService);

  router = inject(Router);

  vehicles: VehicleDTO[] = [];

  ngOnInit(): void {
    this.vehicleService.getAll().subscribe({
      next: vehicles => this.vehicles = vehicles,
      error: err => console.error(err)
    });
  }

  goToVehicleForm(id: number) {
    this.router.navigate([ '/edit-vehicle', id ]);
  }

  deleteVehicle(vehicle: VehicleDTO) {
    this.vehicleService.delete(vehicle.id).subscribe({
      next: () => {
        const index = this.vehicles.indexOf(vehicle);
        if (index > -1) {
          this.vehicles.splice(index, 1);
        }
      },
      error: (err) => {
        // TODO: notification
        console.error(err);
      }
    });
  }
}
