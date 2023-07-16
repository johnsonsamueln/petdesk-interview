import * as React from "react";
import { Animal, Appointment, Species, User } from "../../../types/appointments/ui";
import { ReactComponent as UserIcon } from "../../../content/user.svg";
import { ReactComponent as DogIcon } from "../../../content/dog.svg";
import { ReactComponent as CatIcon } from "../../../content/cat.svg";
import { ReactComponent as BirdIcon } from "../../../content/bird.svg";
import { ReactComponent as PawIcon } from "../../../content/paw.svg";
import { ReactComponent as ClockIcon } from "../../../content/clock.svg";
import "./AppointmentDetail.css"

type AppointmentDetailsProps = {
    appointment: Appointment
}
export const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({ appointment }) => {
    return (
        <div id={`appointment-detail-${appointment.appointmentId}`} className="appointment-detail">
            <h3>{appointment.appointmentType}</h3>
            <div className="appointment-detail-body">
                <UserDetails user={appointment.user} />
                <AnimalDetails animal={appointment.animal} />
                <ScheduleDetails appointment={appointment} />
            </div>
        </div>
    )
}

type UserDetailsProps = {
    user: User | null;
}
export const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
    return (
        <div className="appointment-member-detail user-detail">
            <UserIcon />
            <span>{user?.givenName} {user?.familyName}</span>
        </div>
    )
}

type AnimalDetailsProps = {
    animal: Animal | null;
}
export const AnimalDetails: React.FC<AnimalDetailsProps> = ({ animal }) => {
    let icon: React.ReactNode;
    switch (animal?.species) {
        case Species.Dog:
            icon = <DogIcon />
            break;
        case Species.Bird:
            icon = <BirdIcon />
            break;
        case Species.Cat:
            icon = <CatIcon />
            break;
        default:
            icon = <PawIcon />
    }

    let breed = animal?.breed && `(${animal.breed})` 

    return (
        <div className="appointment-member-detail animal-detail">
            {icon}
            <span>{animal?.givenName} {breed}</span>
        </div>
    )
}

export const ScheduleDetails: React.FC<AppointmentDetailsProps> = ({ appointment }) => {
    return (
        <div className="appointment-member-detail schedule-detail">
            <ClockIcon />
            <span>{appointment.requestedDateTimeOffset?.toLocaleString()}</span>
        </div>
    )
}