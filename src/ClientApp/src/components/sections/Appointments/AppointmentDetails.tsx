import * as React from "react";
import { Appointment } from "../../../types/appointments/ui";

type Props = {
    appointment: Appointment
}
export const AppointmentDetails: React.FC<Props> = ({ appointment }) => {
    return (
        <ul>
            <li>{appointment.appointmentType}</li>
            <li>User: {appointment.user?.givenName} {appointment.user?.familyName}</li>
            <li>Animal: {appointment.animal?.givenName} {`(${appointment.animal?.species}, ${appointment.animal?.breed})`}</li>
        </ul>
    )
}