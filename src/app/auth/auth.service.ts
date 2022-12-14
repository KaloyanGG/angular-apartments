import { Injectable } from '@angular/core';
import { IUser } from '../shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: IUser | null = {
    name: 'Johnatan',
    username: 'johhnyUName',
    email: 'test@gmail.bg',
    tel: '003591232342',
    imageUrl: 'https://bit.ly/3W0GG6K'
  } as any;

  get isLoggedIn(){
    return this.user !== null;
  }

  constructor() { 

  }
}
