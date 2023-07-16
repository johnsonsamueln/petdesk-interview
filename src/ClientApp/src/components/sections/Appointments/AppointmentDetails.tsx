import * as React from "react";
import { Animal, Appointment, Species, User } from "../../../types/appointments/ui";
import { ReactComponent as UserIcon } from "../../../content/user.svg";
import { ReactComponent as DogIcon } from "../../../content/dog.svg";
import { ReactComponent as CatIcon } from "../../../content/cat.svg";
import { ReactComponent as BirdIcon } from "../../../content/bird.svg";
import "./AppointmentDetail.css"

type AppointmentDetailsProps = {
    appointment: Appointment
}
export const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({ appointment }) => {
    return (
        <div id={`appointment-detail-${appointment.appointmentId}`} className="appointment-detail">
            <h3>{appointment.appointmentType}</h3>
            <div>Request Created: {appointment.createDateTime?.toLocaleString()}</div>
            <div>Requested Appt Date: {appointment.requestedDateTimeOffset?.toLocaleString()}</div>
            <div className="appointment-detail-body">
                <UserDetails user={appointment.user} />
                <AnimalDetails animal={appointment.animal} />
            </div>
        </div>
    )
}

type UserDetailsProps = {
    user: User | null;
}
export const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
    return (
        <div className="appointment-member-detail user-detail"><UserIcon />User: {user?.givenName} {user?.familyName}</div>
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
            icon = <></>
    }
    return (
        <div className="appointment-member-detail animal-detail">{icon}Animal: {animal?.givenName} {`(${animal?.species}, ${animal?.breed})`}</div>
    )
}