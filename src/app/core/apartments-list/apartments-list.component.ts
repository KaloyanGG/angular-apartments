import { AuthService } from 'src/app/auth/auth.service';
import { ApiService } from './../../api.service';
import { Component, OnInit } from '@angular/core';
import { IApartment } from 'src/app/shared/interfaces/apartment';

@Component({
  selector: 'app-apartments-list',
  templateUrl: './apartments-list.component.html',
  styleUrls: ['./apartments-list.component.scss']
})
export class ApartmentsListComponent {

  apartmentsList: IApartment[] | null = null;
  errorFetchingData = false;
  constructor(public apiService: ApiService, private authService: AuthService) { }


  rentApartment(id: number) {
    
    if(this.authService.user.value === null) {
      alert('You must be logged in to rent an apartment!');
      return;
    }
    this.apiService.rentApartment(id);
  }



}
