import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { sameValueGroupValidator } from 'src/app/shared/validators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email]],
    tel: ['', [Validators.minLength(5)]],
    name: ['', [Validators.required, Validators.minLength(5)]],
    imageUrl: [''],
    pass: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: []
    }, {
      validators: [sameValueGroupValidator('password', 'rePassword')]
    })
  });

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  registerHandler() {
    // this.authService.register(this.form.value as IUser);
    this.authService.register({
      ...this.form.value,
      password: this.form.value.pass?.password
    } as any);
  }

} 
