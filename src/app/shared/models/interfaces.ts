export interface Doctor {
    id: string;
    name: string;
    specialization: string;
    schedule: Schedule[];
}

export interface Schedule {
    day: string;
    time: string;
    status: AppointmentStatus;
}

export interface Appointment {
    id: string;
    doctorId: string;
    patientId: string;
    dateTime: string;
    status: AppointmentStatus;
}

export interface Patient {
    id: string;
    name: string;
    email: string;
    phone: string;
    appointments: string[];
}

export type AppointmentStatus = 'Szabad' | 'Foglalt';

export interface TimeSlot {
    nap: string;
    ido: string;
    allapot: AppointmentStatus;
}
