import { IUser } from './../../shared/interfaces/user';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  showEditMode = false;

  // get user() {
  //   const { username, email, tel, name, imageUrl } = this.authService.user!;
  //   return {
  //     username,
  //     email,
  //     tel,
  //     name,
  //     imageUrl

  //   }
  // }
  user: IUser = {} as any;

  form = this.fb.group({
    username: [this.user.username, [Validators.required, Validators.minLength(5)]],
    email: [this.user.email, [Validators.required, Validators.email]],
    tel: [this.user.tel],
    name: [this.user.name, [Validators.required, Validators.minLength(5)]],
    imageUrl: [this.user.imageUrl]
  }); 

  constructor(private fb: FormBuilder, public authService: AuthService) {
    this.authService.user.subscribe(user => {
      // this.form.setValue(
      //   user as any
      // );
      this.user = user as any;

    });
  }


  toggleEditMode(): void {
    this.showEditMode = !this.showEditMode;
  }


  saveProfile(): void {
    if (this.form.invalid) { return; }
    const { username, email, tel, name, imageUrl } = this.form.value;
    this.authService.user = {
      username, email, tel, name, imageUrl
    } as any;
    console.log(this.form.value);
    this.toggleEditMode();
  }

}
