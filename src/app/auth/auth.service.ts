
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { IUser } from '../shared/interfaces/user';
import { Firestore, setDoc, doc, getDoc } from '@angular/fire/firestore';


import { signInWithEmailAndPassword, createUserWithEmailAndPassword, Auth, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class AuthService {

  public user = new BehaviorSubject<undefined | null | IUser>(null);


  initialize(): Promise<any> {
    return new Promise((resolve) => {
      // Fetch data from an API or do some other asynchronous task      
      onAuthStateChanged(this.afAuth, (user) => {
        if (user) {
          getDoc(doc(this.afs, 'users', user.uid)).then((doc) => {
            if (doc.exists()) {
              this.user.next(doc.data() as IUser);
              resolve('initialized');
            }
          });
  
        } else {
          this.user.next(null);
          resolve('initialized');
        }
        

      });
      
    }); 
  }



  constructor(public afs: Firestore, public afAuth: Auth, public router: Router) {
    


  }

  setUserData(user: any) {
    getDoc(doc(this.afs, 'users', user.id)).then((doc) => {
      if (doc.exists()) {
        this.user.next(doc.data() as IUser);
      }
    });
  }


  login(email: string, password: string) {

    return signInWithEmailAndPassword(this.afAuth, email, password)
      .then((result) => {
        this.setUserData(result.user);
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          throw new Error('User not found');
        }
        if (error.code === 'auth/wrong-password') {
          throw new Error('Wrong password');
        }

      });
  }

  register(user: IUser) {
    return createUserWithEmailAndPassword(this.afAuth, user.email, user.password as string)
      .then((result) => {
        setDoc(doc(this.afs, 'users', result.user.uid), {
          email: user.email,
          id: result.user.uid,
          username: user.username,
          imageUrl: user.imageUrl,
          name: user.name,
          tel: user.tel

        })
      })
      .catch((error) => {
        console.error(error.message);
        window.alert(error.message);
      });
  }

  updateProfile(user: IUser) {
    user.id = this.user.value?.id as string;
    user.email = this.user.value?.email as string;

    setDoc(doc(this.afs, 'users', user.id), user).then(() => {
      this.user.next(user);
    });

  }

  logout() {
    signOut(this.afAuth).then(() => {
      this.router.navigate(['/']);
    });
  }

}

export function initializeMyService(myService: AuthService) {
  return () => myService.initialize();
}