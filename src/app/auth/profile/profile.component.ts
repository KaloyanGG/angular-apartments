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

  user: IUser = {} as any;

  form = {} as any; 

  constructor(private fb: FormBuilder, public authService: AuthService) {
    this.authService.user.subscribe(user => {
      // this.form.setValue(
      //   user as any
      // );
      this.user = user as any;
      this.form = this.fb.group({
        username: [this.user.username, [Validators.required, Validators.minLength(5)]],
        email: [this.user.email, [Validators.required, Validators.email]],
        tel: [this.user.tel],
        name: [this.user.name, [Validators.required, Validators.minLength(5)]],
        imageUrl: [this.user.imageUrl]
      }); 
    });
  }

  toggleEditMode(): void {
    this.showEditMode = !this.showEditMode;
  }


  saveProfile(): void {
    if (this.form.invalid) { return; }
    const { username, email, tel, name, imageUrl } = this.form.value;
    // this.authService.user = {
    //   username, email, tel, name, imageUrl
    // } as any;
    // console.log(this.form.value);
    this.authService.updateProfile(this.form.value as any);
    this.toggleEditMode();
  }

}
