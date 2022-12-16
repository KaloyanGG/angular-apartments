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
      this.user = user as any;
      this.form = this.fb.group({
        username: [this.user.username, [Validators.required, Validators.minLength(5)]],
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

    this.authService.updateProfile(this.form.value as any);
    this.toggleEditMode();
  }

}
