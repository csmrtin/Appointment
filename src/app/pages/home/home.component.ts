import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private router: Router) {
  }

  changePage() {
    this.router.navigateByUrl("./booking");
  }
}
