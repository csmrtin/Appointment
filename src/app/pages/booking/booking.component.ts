import {Component, signal} from '@angular/core';
import {Router} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-booking',
  imports: [
    MatButtonModule,
    MatInput
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent {
  constructor(private router: Router) {
  }

  changePage() {
    this.router.navigateByUrl("/appointments");
  }

}

