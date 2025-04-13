import { Component } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import {Router} from '@angular/router';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  standalone: true,
  imports: [NgClass, NgForOf, NgIf, MatButtonModule],
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent {
  constructor(private router: Router) {
  }

  changePage() {
    this.router.navigateByUrl("/appointments");
  }

  betegsegek: string[] = [
    'Bőrgyógyász', 'Belgyógyás', 'Szemész', 'Fogorvos',
    'Fülorrgégész', 'Sebész', 'Endokrinológus', 'Gasztroenterológus',
    'Pszichiáter', 'Pszichológus', 'Neurológus', 'Pullmonológus',
    'Érsebész', 'Reumatológus', 'Ortopédus', 'Kardiológus'
  ];

  kivalasztottBetegseg: string | null = null;
  megjelenitettOrvosok: string[] = [];

  orvosokAtlo1: string[] = ['Dr.Kovács Ignác', 'Dr. Németh Bulcsú', 'Dr. Varga Regő'];
  orvosokAtlo2: string[] = ['Dr.Tóth Tibor', 'Dr.Kiss Igor', 'Dr.Szabó Erika'];
  orvosokCsoport3: string[] = ['Dr. Szegedi Gábor', 'Dr. Gárdonyi Réka', 'Dr.Havas Balázs'];
  orvosokCsoport4: string[] = ['Dr. Pásztor Ágnes', 'Dr.Angyal Zsolt', 'Dr.Danka Dóra'];

  valasszBetegseget(betegseg: string, index: number): void {
    this.kivalasztottBetegseg = betegseg;

    const atlo1 = [0, 5, 10, 15];
    const atlo2 = [13, 9, 6, 3];
    const csoport3 = [1, 4, 7, 12];
    const csoport4 = [2, 8, 11, 14];

    if (atlo1.includes(index)) {
      this.megjelenitettOrvosok = this.orvosokAtlo1;
    } else if (atlo2.includes(index)) {
      this.megjelenitettOrvosok = this.orvosokAtlo2;
    } else if (csoport3.includes(index)) {
      this.megjelenitettOrvosok = this.orvosokCsoport3;
    } else if (csoport4.includes(index)) {
      this.megjelenitettOrvosok = this.orvosokCsoport4;
    } else {
      this.megjelenitettOrvosok = [];
    }
  }
  ugorjOrvoshoz(orvosNev: string): void {
    this.router.navigate(['/doctors'], { queryParams: { doctor: orvosNev } });
  }

}
