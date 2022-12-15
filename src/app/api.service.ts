import { Firestore, collection, query, setDoc, doc } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'environments/environment';
import { IApartment } from './shared/interfaces/apartment';
import { getDocs } from '@firebase/firestore';
import { BehaviorSubject } from 'rxjs';

const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient, private afs: Firestore) {
    this.loadApartments();
  }
  apartments: BehaviorSubject<IApartment[]> = new BehaviorSubject<IApartment[]>([]);

  loadApartments() {
    getDocs(query(collection(this.afs, 'apartments'))).then((querySnapshot) => {
      const aps: IApartment[] = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
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


  loadApartment(id: number) {
    return this.httpClient.get<IApartment>(`${apiURL}/apartments/${id}`);
  }

  // loadPosts(limit?: number) {
  //   return this.httpClient.get<IPost[]>(`${apiURL}/posts${limit ? `?limit=${limit}` : ``}`);
  // }

}