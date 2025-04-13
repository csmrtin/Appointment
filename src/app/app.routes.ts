import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { BookingComponent } from './pages/booking/booking.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'booking', component: BookingComponent },  // közvetlen importálás
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'doctors', component: DoctorsComponent },
  {
    path: 'tasks',
    loadComponent: () => import('./pages/booking/booking.component').then(m => m.BookingComponent),
  },
  { path: 'appointment', component: AppointmentsComponent },
  { path: 'doctor', component: DoctorsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: BookingComponent },
];
