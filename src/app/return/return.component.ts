import { Component, OnInit, inject } from '@angular/core';
import { BorrowService } from '../services/borrow.service';
import { BorrowVehicleDTO, VehicleDTO } from '../../../models';
import { Router } from '@angular/router';
import { Status } from '../../../server/status.enum';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-return',
  standalone: true,
  imports: [],
  templateUrl: './return.component.html',
  styleUrl: './return.component.css'
})
export class ReturnComponent implements OnInit {
  borrowService = inject(BorrowService);
  vehicleService = inject(VehicleService);


  router = inject(Router);

  borrows: BorrowVehicleDTO[] = [];
  
  ngOnInit(): void {
    this.borrowService.getAll().subscribe({
      next: borrows => this.borrows = borrows,
      error: err => console.error(err)
    });
  }

  goToBorrowForm(id: number) {
    this.router.navigate([ '/borrow', id ]);
  }

  deleteBorrow(borrow: BorrowVehicleDTO) {
    this.borrowService.delete(borrow.id).subscribe({
      next: () => {
        const index = this.borrows.indexOf(borrow);
        if (index > -1) {
          this.borrows.splice(index, 1);
        }
      },
      error: (err) => {
        // TODO: notification
        console.error(err);
      }
    });
  }

 openReturn(borrow: BorrowVehicleDTO) {
    // Megjeleníthetünk egy felugró ablakot itt
    const isDamaged = confirm('A jármű sérült?');
    const userInput = prompt('Futott kilóméter:');
    const priceOfRent: number = borrow.vehicle?.price as number;

    if (userInput !== null) {
      const kms = parseFloat(userInput);

    // Kalkuláció
    const price = isDamaged ? ((borrow.days * priceOfRent + kms * 200) + 20000) : (borrow.days * priceOfRent + kms * 200);

    // Az eredmény megjelenítése (csak példa)
    alert(`Fizetendő: ${price}`);

    const vehicle = borrow.vehicle as VehicleDTO;
    if (isDamaged) {
      vehicle.state = Status.Scrapped;
    } else {
      vehicle.state = Status.Free;
    }

    vehicle.km = vehicle.km + kms;

    this.borrowService.delete(borrow.id).subscribe({
      next: () => {
      const index = this.borrows.indexOf(borrow);
      if (index > -1) {
        this.borrows.splice(index, 1);
      } 
    }
    });
    this.vehicleService.update(vehicle).subscribe(vehicle => { console.log(vehicle); });
  }
}
}
