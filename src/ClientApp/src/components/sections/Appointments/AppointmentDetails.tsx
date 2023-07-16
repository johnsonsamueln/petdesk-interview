import * as React from "react";
import { Appointment } from "../../../types/appointments/ui";
import "./AppointmentDetail.css"

type Props = {
    appointment: Appointment
}
export const AppointmentDetails: React.FC<Props> = ({ appointment }) => {
    return (
        <ul id={`appointment-detail-${appointment.appointmentId}`} className="appointment-detail">
            <li>{appointment.appointmentType}</li>
            <li>User: {appointment.user?.givenName} {appointment.user?.familyName}</li>
            <li>Animal: {appointment.animal?.givenName} {`(${appointment.animal?.species}, ${appointment.animal?.breed})`}</li>
        </ul>
    )
}