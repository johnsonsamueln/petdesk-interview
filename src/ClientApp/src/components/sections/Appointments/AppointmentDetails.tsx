import * as React from "react";
import { Animal, Appointment, User } from "../../../types/appointments/ui";
import { ReactComponent as UserIcon } from "../../../content/user.svg";
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
    return (
        <div className="appointment-member-detail animal-detail">Animal: {animal?.givenName} {`(${animal?.species}, ${animal?.breed})`}</div>
    )
}