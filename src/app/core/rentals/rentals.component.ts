import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  styleUrls: ['./rentals.component.scss']
})
export class RentalsComponent {

  constructor(public apiService: ApiService,  public authService: AuthService) {
      this.apiService.loadAllRentals();
  }

  unrent(rentId: string, apartmentId: number) {
    this.apiService.unrent(rentId, apartmentId);
  }




}
