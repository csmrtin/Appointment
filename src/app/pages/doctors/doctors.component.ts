import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf, NgForOf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { TimeSlot } from '../../shared/models/interfaces';

@Component({
  selector: 'app-doctors',
  template: `
    <mat-toolbar color="primary" class="toolbar">
      <mat-icon>medical_services</mat-icon>
      <span class="title">Orvosi Időpontfoglalás</span>
    </mat-toolbar>

    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav mode="side" opened class="sidenav">
        <mat-nav-list>
          <h3 matSubheader>Szűrés</h3>
          <mat-form-field appearance="fill">
            <mat-label>Nap szerint</mat-label>
            <mat-select [(value)]="selectedDay">
              <mat-option value="">Összes nap</mat-option>
              <mat-option value="Hétfő">Hétfő</mat-option>
              <mat-option value="Kedd">Kedd</mat-option>
              <mat-option value="Szerda">Szerda</mat-option>
              <mat-option value="Csütörtök">Csütörtök</mat-option>
              <mat-option value="Péntek">Péntek</mat-option>
            </mat-select>
          </mat-form-field>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <div *ngIf="orvosNev" class="doctor-page">
          <div class="schedule-container">
            <h2>
              <mat-icon>person</mat-icon>
              {{ orvosNev }} időpontjai
            </h2>
            <div class="time-slots">
              <mat-card *ngFor="let idopont of getFilteredIdopontok(); let i = index"
                       [class.occupied]="idopont.allapot === 'Foglalt'"
                       [class.available]="idopont.allapot === 'Szabad'"
                       (click)="foglalIdopont(orvosNev, i)">
                <mat-card-header>
                  <mat-card-title>{{ idopont.nap }}</mat-card-title>
                  <mat-card-subtitle>{{ idopont.ido }}</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                  <p class="status">
                    <mat-icon [color]="idopont.allapot === 'Szabad' ? 'primary' : 'warn'">
                      {{ idopont.allapot === 'Szabad' ? 'event_available' : 'event_busy' }}
                    </mat-icon>
                    {{ idopont.allapot }}
                  </p>
                </mat-card-content>
                <mat-card-actions *ngIf="idopont.allapot === 'Szabad'">
                  <button mat-button color="primary" (click)="foglalIdopont(orvosNev, i)">
                    <mat-icon>add</mat-icon>
                    FOGLALÁS
                  </button>
                </mat-card-actions>
              </mat-card>
            </div>
          </div>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .toolbar {
      margin-bottom: 20px;
    }

    .title {
      margin-left: 16px;
    }

    .sidenav-container {
      height: calc(100vh - 64px);
    }

    .sidenav {
      width: 250px;
      padding: 20px;
    }

    .doctor-page {
      padding: 1rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .schedule-container {
      padding: 20px;
    }

    h2 {
      color: #4c3131;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .time-slots {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 16px;
    }

    mat-card {
      cursor: pointer;
      transition: all 0.3s ease;
    }

    mat-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .available {
      background-color: #E3F2FD;
    }

    .occupied {
      background-color: #FFEBEE;
      cursor: not-allowed;
    }

    .status {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 8px 0;
    }

    mat-form-field {
      width: 100%;
    }

    @media (max-width: 768px) {
      .doctor-page {
        padding: 0.5rem;
      }

      .schedule-container {
        padding: 10px;
      }

      .sidenav {
        width: 200px;
      }
    }
  `],
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule
  ]
})
export class DoctorsComponent implements OnInit {
  orvosNev: string | null = null;
  selectedDay: string = '';

  private orvosIdopontok: Record<string, TimeSlot[]> = {
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

  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const rawName = params['doctor'] || '';
      this.orvosNev = decodeURIComponent(rawName);

      if (this.orvosNev) {
        this.orvosNev = this.orvosNev.replace(/Dr\.\s+/, 'Dr.');
        this.orvosNev = this.orvosNev.replace('Dr.', 'Dr. ');
      }

      if (!this.orvosIdopontok[this.orvosNev]) {
        const availableDoctors = Object.keys(this.orvosIdopontok);
        const foundDoctor = availableDoctors.find(name =>
          name.toLowerCase().replace(/\s+/g, '') === this.orvosNev?.toLowerCase().replace(/\s+/g, '')
        );

        if (foundDoctor) {
          this.orvosNev = foundDoctor;
        }
      }
    });
  }

  getFilteredIdopontok(): TimeSlot[] {
    const idopontok = this.getIdopontok(this.orvosNev || '');
    if (!this.selectedDay) return idopontok;
    return idopontok.filter(idopont => idopont.nap === this.selectedDay);
  }

  getIdopontok(orvosNev: string): TimeSlot[] {
    return this.orvosIdopontok[orvosNev] || [];
  }

  foglalIdopont(orvosNev: string, index: number): void {
    const idopontok = this.orvosIdopontok[orvosNev];
    if (idopontok && idopontok[index].allapot === 'Szabad') {
      idopontok[index].allapot = 'Foglalt';
      this.snackBar.open('Sikeres időpontfoglalás!', 'Rendben', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
  }
}

