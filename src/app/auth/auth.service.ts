
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

  constructor(public afs: Firestore, public afAuth: Auth, public router: Router) {
    onAuthStateChanged(this.afAuth, (user) => {
      if (user) {
        getDoc(doc(this.afs, 'users', user.uid)).then((doc) => {
          if (doc.exists()) {
            this.user.next(doc.data() as IUser);
          }
        });

      }else{
        this.user.next(null);
      }
    });
    

  }

  setUserData(user: any) {
    getDoc(doc(this.afs, 'users', user.uid)).then((doc) => {
      if (doc.exists()) {
        this.user.next(doc.data() as IUser);
      }
    });

  }


  login(email: string, password: string) {

    return signInWithEmailAndPassword(this.afAuth, email, password)
      .then((result) => {
        this.setUserData(result.user);
        console.log('User logged in: ', result.user);
      })
      .catch((error) => {
        if(error.code === 'auth/user-not-found'){
          throw new Error('User not found');
        }
        if(error.code === 'auth/wrong-password'){
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
          name: user.name,
          tel: user.tel

        })
        // collection(this.afs, `users/${result.user?.uid}`).firestore.;
        this.setUserData(user);
        // this.router.navigate(['dashboard']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  logout() {
    signOut(this.afAuth).then(() => {
      this.router.navigate(['/']);
    });

  }



}
