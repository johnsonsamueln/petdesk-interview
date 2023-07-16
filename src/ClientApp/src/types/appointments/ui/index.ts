export interface Appointment {
    appointmentId: number;
    appointmentStatus: AppointmentStatus;
    appointmentType: string | null;
    createDateTime: Date | null;
    requestedDateTimeOffset: Date | null;
    user: User | null;
    animal: Animal | null;
}

export enum AppointmentStatus {
    NewPatientRequest = "NewPatientRequest",
    ConfirmedByVet = "ConfirmedByVet",
    RescheduleRequestedByVet = "RescheduleRequestedByVet"
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
    species: Species | null;
    breed: string | null;
}

export enum Species {
    Dog = "Dog",
    Bird = "Bird",
    Cat = "Cat"
}