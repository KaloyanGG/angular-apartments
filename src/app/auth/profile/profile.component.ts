import { Subscription } from 'rxjs';
import { IUser } from './../../shared/interfaces/user';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnDestroy {

  showEditMode = false;
  subs: Subscription;

  user: IUser = {} as any;

  form = {} as any; 

  constructor(private fb: FormBuilder, public authService: AuthService) {

    this.subs = this.authService.user.subscribe(user => {

      if(!user) { return; }

      this.user = user as any;
      this.form = this.fb.group({
        username: [this.user.username, [Validators.required, Validators.minLength(5)]],
        tel: [this.user.tel],
        name: [this.user.name, [Validators.required, Validators.minLength(5)]],
        imageUrl: [this.user.imageUrl]
      }); 
    });
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  toggleEditMode(): void {
    this.showEditMode = !this.showEditMode;
  }


  saveProfile(): void {
    if (this.form.invalid) { return; }
    // console.log(this.form.value);
    this.authService.updateProfile(this.form.value as any);
    this.toggleEditMode();
  }

}
