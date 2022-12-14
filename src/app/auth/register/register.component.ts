import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { sameValueGroupValidator } from 'src/app/shared/validators';

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
    pass: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(5)]],
      rePassword: []
    }, {
      validators: [sameValueGroupValidator('password', 'rePassword')]
    })
  });

  constructor(private fb: FormBuilder) { }


  registerHandler() {
    console.log(this.form.value);
  }

}
