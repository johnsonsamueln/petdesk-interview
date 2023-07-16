export interface AppointmentResponse {
    appointments: Appointment[];
}

export interface Appointment {
    appointmentId: number;
    appointmentType: string | null;
    createDateTime: string | null;
    requestedDateTimeOffset: string | null;
    user: User | null;
    animal: Animal | null;
}

export interface User {
    userId: number;
    givenName: string | null;
    familyName: string | null;
    vetDataId: string | null;
}

export interface Animal {
    animalId: number;
    givenName: string | null;
    species: string | null;
    breed: string | null;
}