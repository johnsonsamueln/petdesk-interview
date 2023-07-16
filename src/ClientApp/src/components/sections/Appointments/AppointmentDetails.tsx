import * as React from "react";
import { Appointment } from "../../../types/appointments/ui";
import "./AppointmentDetail.css"

type Props = {
    appointment: Appointment
}
export const AppointmentDetails: React.FC<Props> = ({ appointment }) => {
    return (
        <div id={`appointment-detail-${appointment.appointmentId}`} className="appointment-detail">
            <h3>{appointment.appointmentType}</h3>
            <div>User: {appointment.user?.givenName} {appointment.user?.familyName}</div>
            <div>Animal: {appointment.animal?.givenName} {`(${appointment.animal?.species}, ${appointment.animal?.breed})`}</div>
        </div>
    )
}