import { ApiService } from './../../api.service';
import { Component, OnInit } from '@angular/core';
import { IApartment } from 'src/app/shared/interfaces/apartment';

@Component({
  selector: 'app-apartments-list',
  templateUrl: './apartments-list.component.html',
  styleUrls: ['./apartments-list.component.scss']
})
export class ApartmentsListComponent implements OnInit {

  apartmentsList: IApartment[] | null = null;
  errorFetchingData = false;
  constructor(public apiService: ApiService) { }

  ngOnInit() {
    // this.apiService.loadApartments()
  }

}
