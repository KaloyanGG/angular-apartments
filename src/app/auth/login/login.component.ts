import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // appEmailDomains = appEmailDomains;

  @ViewChild(
    // 'form',
    NgForm,
    { static: true }
  ) form!: ElementRef<HTMLInputElement>;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private authService: AuthService) {

  }

  loginHandler(form: NgForm): void {
    this.authService.login(form.value.email, form.value.password)
      .then(() => {
        this.router.navigate(['/apartments']);
      })
      .catch(err => {
        alert(err.message);
      });


  }
}
