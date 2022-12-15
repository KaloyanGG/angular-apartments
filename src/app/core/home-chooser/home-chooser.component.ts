import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home-chooser',
  templateUrl: './home-chooser.component.html',
  styleUrls: ['./home-chooser.component.scss']
})
export class HomeChooserComponent {
  constructor(public authService: AuthService) { }
}
