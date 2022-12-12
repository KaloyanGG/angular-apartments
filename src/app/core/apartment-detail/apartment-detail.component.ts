import { IApartment } from './../../interfaces/apartment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-apartment-detail',
  templateUrl: './apartment-detail.component.html',
  styleUrls: ['./apartment-detail.component.scss']
})
export class ApartmentDetailComponent implements OnInit {

  apartment: IApartment | null = null;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    // this.route.params.subscribe(console.log);
  }

  ngOnInit() {
    this.apiService.loadApartment(this.route.snapshot.params['id']).subscribe(({
      next: (value) => {
        this.apartment = value;
        console.log(this.apartment);
      },
      error: (error) => {
        console.log(error);
        console.log(this.route);
      }
    }));
  }
}
