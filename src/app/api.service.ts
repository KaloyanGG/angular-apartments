import { AuthService } from 'src/app/auth/auth.service';
import { Firestore, collection, query, setDoc, doc, addDoc } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { IApartment } from './shared/interfaces/apartment';
import { getDocs } from '@firebase/firestore';
import { BehaviorSubject, map } from 'rxjs';
import { IComment } from './shared/interfaces/comment';

// const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient,
    private afs: Firestore,
    private authService: AuthService) {
    this.loadApartments();
    this.loadAllComments();
  }
  apartments: BehaviorSubject<IApartment[]> = new BehaviorSubject<IApartment[]>([]);
  allComments: BehaviorSubject<IComment[]> = new BehaviorSubject<IComment[]>([]);
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
  loadAllComments() {
    getDocs(query(collection(this.afs, 'comments'))).then((querySnapshot) => {
      const comments: IComment[] = [];
      querySnapshot.forEach((doc) => {
        comments.push(doc.data() as IComment);
      });
      this.allComments.next(comments);
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

  //TODO: use promise
  loadApartment(id: number): void {
    let apart: IApartment = {} as IApartment;
    this.apartments.pipe(map((aps) => {
      return aps.find((ap) => ap.id === id);
    })).subscribe((apartment) => {
      this.apartment.next(apartment as IApartment);
    });
  }

  loadCommentsOfApartment(apartmentId: number) {
    this.allComments.pipe(map((coms) => {
      return coms.filter((com) => com.apartmentId === apartmentId);
    })).subscribe((coms) => {
      this.currentComments.next(coms);

    });
    // this.currentComments.subscribe((coms) => {
    //   console.log('all comments for this ap: ');
    //   console.log(coms);
    // })

  }

  addComment(content: string) {
    this.authService.user.subscribe((user) => {
      addDoc(collection(this.afs, 'comments'), {
        content, userId: user?.id, apartmentId: this.apartment.value.id, date: new Date()
      }).then(() => {

        this.loadAllComments();
        // this.loadCommentsOfApartment(this.apartment.value.id);

      });

    }).unsubscribe();
    //TODO? ZASHTO DWA PUTI GI RENDERIRA




  }

}