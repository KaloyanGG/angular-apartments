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
     console.log(form.value);

    if (form.invalid) { return; }
    this.authService.user = {
      username: 'John'
    } as any;
    console.log(this.authService.user);

    const returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';

    this.router.navigate([returnUrl]);
  }
}
