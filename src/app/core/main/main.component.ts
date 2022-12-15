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
  apsArray = [
    {
        "id": 1,
        "name": "Apartment 1",
        "numberOfRooms": 4,
        "address": "Address 1",
        "city": "City 1",
        "description": "Description 1",
        "imageUrl": "https://bit.ly/3Bovk47",
        "available": true,
        "pricePerDay": 100.50
    },
    {
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
    },
    {
        "id": 5,
        "name": "Apartment 5",
        "numberOfRooms": 3,
        "address": "Address 5",
        "city": "City 5",
        "description": "Description 5",
        "imageUrl": "https://bit.ly/3FlwUov",
        "available": true,
        "pricePerDay": 90.34
    },
    {
        "id": 6,
        "name": "Apartment 6",
        "numberOfRooms": 2,
        "city": "City 6",
        "description": "Description 6",
        "imageUrl": "https://bit.ly/3VPZg1d",
        "available": true,
        "pricePerDay": 700.34
    },
    {
        "id": 7,
        "name": "Apartment 7",
        "numberOfRooms": 3,
        "address": "Address 7",
        "city": "City 7",
        "description": "Description 7",
        "imageUrl": "https://bit.ly/3PiyrAm",
        "available": true,
        "pricePerDay": 35.75
    }
];
  clickButtonHandler(){
    // this.apiService.addApartments(this.apsArray);
    this.apiService.loadApartment(3);
  }
}
