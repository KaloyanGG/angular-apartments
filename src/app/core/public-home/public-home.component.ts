import { IUser } from 'src/app/shared/interfaces/user';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-home',
  templateUrl: './public-home.component.html',
  styleUrls: ['./public-home.component.scss']
})
export class PublicHomeComponent {
  user = null;
  constructor(public authService: AuthService,
    private router: Router) {

    // this.authService.user.subscribe(user => {
    //   this.user = user as any;
    //   if (this.user) {
    //     this.router.navigate(['/apartments']);
    //   }
    // });

  }


}
