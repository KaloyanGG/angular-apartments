import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'environments/environment';
import { IApartment } from './shared/interfaces/apartment';

const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  loadApartments() {
    return this.httpClient.get<IApartment[]>(`${apiURL}/apartments`);
  }
  loadApartment(id: number) {
    return this.httpClient.get<IApartment>(`${apiURL}/apartments/${id}`);
  }

  // loadPosts(limit?: number) {
  //   return this.httpClient.get<IPost[]>(`${apiURL}/posts${limit ? `?limit=${limit}` : ``}`);
  // }

}