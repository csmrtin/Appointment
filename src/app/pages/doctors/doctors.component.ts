import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf, NgForOf, NgClass } from '@angular/common';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss'],
  standalone: true,
  imports: [NgIf, NgForOf, NgClass]
})
export class DoctorsComponent implements OnInit {
  orvosNev: string | null = null;

  orvosIdopontok: Record<string, { nap: string, ido: string, allapot: string }[]> = {
    'Dr. Szegedi Gábor': [
      { nap: 'Hétfő', ido: '10:00 - 10:30', allapot: 'Szabad' },
      { nap: 'Hétfő', ido: '10:30 - 11:00', allapot: 'Foglalt' },
      { nap: 'Hétfő', ido: '11:00 - 11:30', allapot: 'Szabad' },
      { nap: 'Csütörtök', ido: '14:00 - 14:30', allapot: 'Szabad' },
      { nap: 'Csütörtök', ido: '14:30 - 15:00', allapot: 'Szabad' },
      { nap: 'Csütörtök', ido: '15:00 - 15:30', allapot: 'Szabad' },
      { nap: 'Csütörtök', ido: '15:30 - 16:00', allapot: 'Szabad' },

    ],
    'Dr. Gárdonyi Réka': [
      { nap: 'Kedd', ido: '08:00 - 09:00', allapot: 'Foglalt' },
      { nap: 'Kedd', ido: '09:00 - 10:00', allapot: 'Szabad' },
      { nap: 'Kedd', ido: '10:00 - 11:00', allapot: 'Szabad' },
      { nap: 'Kedd', ido: '11:00 - 12:00', allapot: 'Foglalt' },
      { nap: 'Kedd', ido: '12:00 - 13:00', allapot: 'Szabad' },
      { nap: 'Péntek', ido: '13:00 - 14:00', allapot: 'Szabad' },
      { nap: 'Péntek', ido: '14:00 - 15:00', allapot: 'Szabad' },
      { nap: 'Péntek', ido: '15:00 - 16:00', allapot: 'Szabad' },
      { nap: 'Péntek', ido: '16:00 - 17:00', allapot: 'Szabad' },

    ],
    'Dr.Havas Balázs': [
      { nap: 'Szerda', ido: '08:00 - 09:00', allapot: 'Szabad' },
      { nap: 'Szerda', ido: '09:00 - 10:00', allapot: 'Szabad' },
      { nap: 'Szerda', ido: '10:00 - 11:00', allapot: 'Szabad' },
      { nap: 'Szerda', ido: '11:00 - 12:00', allapot: 'Szabad' },
      { nap: 'Szerda', ido: '12:00 - 13:00', allapot: 'Szabad' },
      { nap: 'Szerda', ido: '13:00 - 14:00', allapot: 'Szabad' },
      { nap: 'Péntek', ido: '13:30 - 14:00', allapot: 'Foglalt' },
      { nap: 'Péntek', ido: '14:00 - 14:30', allapot: 'Foglalt' },
      { nap: 'Péntek', ido: '14:30 - 15:00', allapot: 'Foglalt' },
      { nap: 'Péntek', ido: '15:00 - 15:30', allapot: 'Foglalt' },
      { nap: 'Péntek', ido: '15:30 - 16:00', allapot: 'Foglalt' },

    ],
    'Dr.Kovács Ignác': [
      { nap: 'Hétfő', ido: '08:00 - 10:00', allapot: 'Szabad' },
      { nap: 'Hétfő', ido: '10:00 - 12:00', allapot: 'Foglalt' },
      { nap: 'Hétfő', ido: '12:00 - 14:00', allapot: 'Foglalt' },
      { nap: 'Hétfő', ido: '14:00 - 16:00', allapot: 'Foglalt' },

      { nap: 'Szerda', ido: '13:15 - 14:00', allapot: 'Foglalt' },
      { nap: 'Szerda', ido: '14:00 - 14:45', allapot: 'Szabad' },
      { nap: 'Szerda', ido: '14:45 - 15:30', allapot: 'Foglalt' },
      { nap: 'Szerda', ido: '15:30 - 16:15', allapot: 'Szabad' },

    ],
    'Dr. Németh Bulcsú': [
      { nap: 'Kedd', ido: '09:00 - 09:35', allapot: 'Foglalt' },
      { nap: 'Kedd', ido: '09:35 - 10:10', allapot: 'Foglalt' },
      { nap: 'Kedd', ido: '10:10 - 10:45', allapot: 'Szabad' },
      { nap: 'Kedd', ido: '10:45 - 11:20', allapot: 'Szabad' },
      { nap: 'Kedd', ido: '11:55 - 12:30', allapot: 'Foglalt' },
      { nap: 'Kedd', ido: '12:30 - 13:05', allapot: 'Szabad' },

      { nap: 'Csütörtök', ido: '09:00 - 11:00', allapot: 'Foglalt' },
      { nap: 'Csütörtök', ido: '09:00 - 11:00', allapot: 'Szabad' },
      { nap: 'Csütörtök', ido: '09:00 - 11:00', allapot: 'Szabad' },
      { nap: 'Csütörtök', ido: '09:00 - 11:00', allapot: 'Foglalt' },
      { nap: 'Csütörtök', ido: '09:00 - 11:00', allapot: 'Szabad' },

    ],
    'Dr. Varga Regő': [
      { nap: 'Hétfő', ido: '08:00 - 08:30', allapot: 'Szabad' },
      { nap: 'Hétfő', ido: '08:30 - 9:00', allapot: 'Foglalt' },
      { nap: 'Hétfő', ido: '09:00 - 09:30', allapot: 'Szabad' },
      { nap: 'Hétfő', ido: '09:30 - 10:00', allapot: 'Foglalt' },
      { nap: 'Hétfő', ido: '10:00 - 11:00', allapot: 'Szabad' },
      { nap: 'Péntek', ido: '12:00 - 13:00', allapot: 'Szabad' },
      { nap: 'Péntek', ido: '13:00 - 14:00', allapot: 'Szabad' },
      { nap: 'Péntek', ido: '14:00 - 15:00', allapot: 'Foglalt' },
      { nap: 'Péntek', ido: '15:00 - 16:00', allapot: 'Szabad' },
      { nap: 'Péntek', ido: '16:00 - 17:00', allapot: 'Foglalt' },


    ],
    'Dr.Tóth Tibor': [
      { nap: 'Szerda', ido: '09:00 - 10:00', allapot: 'Foglalt' },
      { nap: 'Szerda', ido: '10:00 - 11:00', allapot: 'Foglalt' },
      { nap: 'Szerda', ido: '11:00 - 12:00', allapot: 'Foglalt' },
      { nap: 'Szerda', ido: '12:00 - 13:00', allapot: 'Foglalt' },
      { nap: 'Szerda', ido: '13:00 - 14:00', allapot: 'Foglalt' },
      { nap: 'Kedd', ido: '13:00 - 14:00', allapot: 'Foglalt' },
      { nap: 'Kedd', ido: '14:00 - 15:00', allapot: 'Foglalt' },
      { nap: 'Kedd', ido: '15:00 - 16:00', allapot: 'Foglalt' },
    ],
    'Dr.Kiss Igor': [
      { nap: 'Csütörtök', ido: '09:00 - 10:00', allapot: 'Szabad' },
      { nap: 'Csütörtök', ido: '10:00 - 11:00', allapot: 'Szabad' },
      { nap: 'Csütörtök', ido: '11:00 - 12:00', allapot: 'Foglalt' },
      { nap: 'Csütörtök', ido: '12:00 - 13:00', allapot: 'Szabad' },
      { nap: 'Csütörtök', ido: '13:00 - 14:00', allapot: 'Szabad' },
      { nap: 'Kedd', ido: '14:00 - 15:00', allapot: 'Szabad' },
      { nap: 'Kedd', ido: '15:00 - 16:00', allapot: 'Foglalt' },
      { nap: 'Kedd', ido: '17:00 - 18:00', allapot: 'Szabad' },


    ],
    'Dr.Szabó Erika': [
      { nap: 'Kedd', ido: '09:00 - 09:35', allapot: 'Szabad' },
      { nap: 'Kedd', ido: '09:35 - 10:10', allapot: 'Szabad' },
      { nap: 'Kedd', ido: '10:10 - 10:45', allapot: 'Foglalt' },
      { nap: 'Kedd', ido: '10:45 - 11:20', allapot: 'Foglalt' },
      { nap: 'Kedd', ido: '11:55 - 12:30', allapot: 'Szabad' },
      { nap: 'Kedd', ido: '12:30 - 13:05', allapot: 'Foglalt' },

      { nap: 'Csütörtök', ido: '09:00 - 11:00', allapot: 'Szabad' },
      { nap: 'Csütörtök', ido: '09:00 - 11:00', allapot: 'Foglalt' },
      { nap: 'Csütörtök', ido: '09:00 - 11:00', allapot: 'Foglalt' },
      { nap: 'Csütörtök', ido: '09:00 - 11:00', allapot: 'Szabad' },
      { nap: 'Csütörtök', ido: '09:00 - 11:00', allapot: 'Foglalt' },
    ],
    'Dr. Pásztor Ágnes': [
      { nap: 'Csütörtök', ido: '09:00 - 10:00', allapot: 'Foglalt' },
      { nap: 'Csütörtök', ido: '10:00 - 11:00', allapot: 'Szabad' },
      { nap: 'Csütörtök', ido: '11:00 - 12:00', allapot: 'Szabad' },
      { nap: 'Csütörtök', ido: '12:00 - 13:00', allapot: 'Foglalt' },
      { nap: 'Csütörtök', ido: '13:00 - 14:00', allapot: 'Foglalt' },
      { nap: 'Kedd', ido: '14:00 - 15:00', allapot: 'Foglalt' },
      { nap: 'Kedd', ido: '15:00 - 16:00', allapot: 'Szabad' },
      { nap: 'Kedd', ido: '17:00 - 18:00', allapot: 'Foglalt' },
    ],
    'Dr.Angyal Zsolt': [
      { nap: 'Szerda', ido: '09:00 - 10:00', allapot: 'Szabad' },
      { nap: 'Szerda', ido: '10:00 - 11:00', allapot: 'Szabad' },
      { nap: 'Szerda', ido: '11:00 - 12:00', allapot: 'Szabad' },
      { nap: 'Szerda', ido: '12:00 - 13:00', allapot: 'Szabad' },
      { nap: 'Szerda', ido: '13:00 - 14:00', allapot: 'Szabad' },
      { nap: 'Kedd', ido: '13:00 - 14:00', allapot: 'Szabad' },
      { nap: 'Kedd', ido: '14:00 - 15:00', allapot: 'Szabad' },
      { nap: 'Kedd', ido: '15:00 - 16:00', allapot: 'Szabad' },
    ],
    'Dr.Danka Dóra': [
      { nap: 'Kedd', ido: '08:30 - 10:30', allapot: 'Szabad' },
      { nap: 'Kedd', ido: '10:30 - 12:00', allapot: 'Foglalt' },
      { nap: 'Kedd', ido: '12:00 - 13:30', allapot: 'Szabad' },
      { nap: 'Kedd', ido: '13:30 - 15:00', allapot: 'Foglalt' },
      { nap: 'Péntek', ido: '10:00 - 11:30', allapot: 'Foglalt' },
      { nap: 'Péntek', ido: '11:30 - 13:00', allapot: 'Szabad' },
      { nap: 'Péntek', ido: '13:00 - 14:30', allapot: 'Foglalt' },
      { nap: 'Péntek', ido: '15:00 - 16:30', allapot: 'Szabad' },
      { nap: 'Péntek', ido: '16:30 - 14800', allapot: 'Szabad' },

    ]
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.orvosNev = decodeURIComponent(params['doctor'] || '');
    });
  }

  getIdopontok(orvosNev: string): { nap: string, ido: string, allapot: string }[] {
    return this.orvosIdopontok[orvosNev] || [];
  }

  foglalIdopont(orvosNev: string, index: number): void {
    const idopontok = this.orvosIdopontok[orvosNev];
    if (idopontok && idopontok[index].allapot === 'Szabad') {
      idopontok[index].allapot = 'Foglalt';
    }
  }
}
