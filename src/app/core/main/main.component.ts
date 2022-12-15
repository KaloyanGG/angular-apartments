import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],

})
export class MainComponent {

  constructor(private apiService: ApiService) { }
  apsArray = [{
    "id": 2,
    "name": "Apartment 2",
    "numberOfRooms": 8,
    "address": "Address 2",
    "city": "City 2",
    "description": "Description 2",
    "imageUrl": "https://bit.ly/3FHqSjn",
    "available": true,
    "pricePerDay": 200.50
},
{
    "id": 3,
    "name": "Apartment 3",
    "numberOfRooms": 3,
    "address": "Address 3",
    "city": "City 3",
    "description": "Description 3",
    "imageUrl": "https://bit.ly/3FpsInT",
    "available": true,
    "pricePerDay": 120.40
},
{
    "id": 4,
    "name": "Apartment 4",
    "numberOfRooms": 5,
    "address": "Address 4",
    "city": "City 4",
    "description": "Description 4",
    "imageUrl": "https://bit.ly/3hjUaLz",
    "available": true,
    "pricePerDay": 80.34
}];
  clickButtonHandler(){
    this.apiService.addApartments(this.apsArray);
  }
}
