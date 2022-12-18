import { AuthService } from 'src/app/auth/auth.service';
import { Firestore, collection, query, setDoc, doc, addDoc, deleteDoc, where, onSnapshot, collectionData } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { IApartment } from './shared/interfaces/apartment';
import { getDocs } from '@firebase/firestore';
import { BehaviorSubject, bindCallback, map, Observable, of } from 'rxjs';
import { IComment } from './shared/interfaces/comment';
import { IRental } from './shared/interfaces/rental';

// const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient,
    private afs: Firestore,
    private authService: AuthService) {
    this.loadApartments();
    // this.loadApartmentComments();
  }
  apartments: BehaviorSubject<IApartment[]> = new BehaviorSubject<IApartment[]>([]);
  // allComments: BehaviorSubject<IComment[]> = new BehaviorSubject<IComment[]>([]);
  allRentals: BehaviorSubject<IRental[]> = new BehaviorSubject<IRental[]>([]);
  apartment: BehaviorSubject<IApartment> = new BehaviorSubject<IApartment>({} as IApartment);
  currentComments: BehaviorSubject<IComment[]> = new BehaviorSubject<IComment[]>([]);

  loadApartments() {
    getDocs(query(collection(this.afs, 'apartments'))).then((querySnapshot) => {
      const aps: IApartment[] = [];
      querySnapshot.forEach((doc) => {
        aps.push(doc.data() as IApartment);
      });
      this.apartments.next(aps);
    });

  }

  getApartmentComments(apartmentId: number) {
    return collectionData(query(collection(this.afs, 'comments'), where('apartmentId', '==', apartmentId)));
  }

  loadAllRentals() {
    getDocs(query(collection(this.afs, 'rentals'))).then((querySnapshot) => {
      const rentals: IRental[] = [];
      querySnapshot.forEach((doc) => {
        rentals.push({ ...doc.data(), id: doc.id } as IRental);
      });
      this.allRentals.next(rentals);

    });

  }

  addApartments(apartments: IApartment[]) {
    apartments.forEach((apartment) => {
      setDoc(doc(this.afs, 'apartments', apartment.id.toString()), apartment)
    });
  }
  addComments(comments: IComment[]) {
    comments.forEach((comment) => {
      setDoc(doc(this.afs, 'comments', comment.id), comment)
    });
  }
  addRentals(rentals: IRental[]) {
    rentals.forEach((rental) => {
      setDoc(doc(this.afs, 'rentals', rental.id), rental)
    });
  }

  loadApartment(id: number): void {
    let apart: IApartment = {} as IApartment;
    this.apartments.pipe(map((aps) => {
      return aps.find((ap) => ap.id === id);
    })).subscribe((apartment) => {
      this.apartment.next(apartment as IApartment);
    });
  }


  addComment(content: string) {

    addDoc(collection(this.afs, 'comments'), {
      content,
      userId: this.authService.user.value?.id,
      apartmentId: this.apartment.value.id,
      date: new Date()
    });


  }

  rentApartment(id: number) {
    addDoc(collection(this.afs, 'rentals'), {
      apartmentId: id,
      userId: this.authService.user.value?.id,
      startDate: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
    }).then(() => {
      setDoc(doc(this.afs, 'apartments', id.toString()), { available: false }, { merge: true })
        .then(() => {
          this.loadApartments();
          this.loadAllRentals();
        });

    });
  }

  unrent(rentId: string, apartmentId: number) {
    deleteDoc(doc(this.afs, 'rentals', rentId)).then(() => {
      this.loadAllRentals();
    }).then(() => {
      setDoc(doc(this.afs, 'apartments', apartmentId.toString()), { available: true }, { merge: true })
        .then(() => {
          this.loadApartments();
        });
    }

    );
  }

}

