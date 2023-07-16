import * as React from "react"
import { Appointment } from "../../../types/appointments/ui"

export const AppointmentsSection: React.FC = () => {
    const [appointments, setAppointments] = React.useState<Appointment[]>([]);

    return (
        <div id="appointments-section">
            <h1>Appointments</h1>
            <div id="appointments-list">
                <ul>
                    {appointments.map(appointment => (
                        <li key={appointment.appointmentId} id={`appointment-${appointment.appointmentId}`}>
                            <ul>
                                <li>{appointment.appointmentType}</li>
                                <li>User: {appointment.user?.givenName} {appointment.user?.familyName}</li>
                                <li>Animal: {appointment.animal?.givenName} {`(${appointment.animal?.species}, ${appointment.animal?.breed})`}</li>
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}