import { Firestore, collection, query, setDoc, doc, getDoc } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'environments/environment';
import { IApartment } from './shared/interfaces/apartment';
import { getDocs } from '@firebase/firestore';
import { BehaviorSubject, filter, map } from 'rxjs';

const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient, private afs: Firestore) {
    this.loadApartments();
  }
  apartments: BehaviorSubject<IApartment[]> = new BehaviorSubject<IApartment[]>([]);
  apartment: BehaviorSubject<IApartment> = new BehaviorSubject<IApartment>({} as IApartment);

  loadApartments() {
    getDocs(query(collection(this.afs, 'apartments'))).then((querySnapshot) => {
      const aps: IApartment[] = [];
      querySnapshot.forEach((doc) => {
        aps.push(doc.data() as IApartment);
      });
      console.log(aps);
      this.apartments.next(aps);
    });

    // return this.httpClient.get<IApartment[]>(`${apiURL}/apartments`);
  }

  //add the apartments array to the firestore
  addApartments(apartments: IApartment[]) {
    console.log(apartments);
    apartments.forEach((apartment) => {
      setDoc(doc(this.afs, 'apartments', apartment.id.toString()), apartment)
    });
  }

//TODO: use promise
  loadApartment(id: number): void {
    let apart: IApartment = {} as IApartment;
    this.apartments.pipe(map((aps) => {
      return aps.find((ap) => ap.id === id);
    })).subscribe((apartment) => {
      this.apartment.next(apartment as IApartment);
      console.log('apartment.value: ');
      console.log(this.apartment.value);
    });
  }

  // loadPosts(limit?: number) {
  //   return this.httpClient.get<IPost[]>(`${apiURL}/posts${limit ? `?limit=${limit}` : ``}`);
  // }

}