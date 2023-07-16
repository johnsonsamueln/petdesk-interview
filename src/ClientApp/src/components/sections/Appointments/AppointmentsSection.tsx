import * as React from "react"
import { Appointment, Species } from "../../../types/appointments/ui"
import { AppointmentResponse } from "../../../types/appointments/api";
import { getDateOrDefault } from "../../../helpers/date";
import { API_ROUTES } from "../../../constants/api-routes";
import { AppointmentDetails } from "./AppointmentDetails";

export const AppointmentsSection: React.FC = () => {
    const [appointments, setAppointments] = React.useState<Appointment[]>([]);

    React.useEffect(() => {
        async function initializeAppointments() {
            const fetchResponse = await fetch(API_ROUTES.APPOINTMENTS_GET, { method: "GET" });
            const appointmentsResponse: AppointmentResponse = await fetchResponse.json();

            const clientAppointments: Appointment[] = appointmentsResponse.appointments.map(serverAppointment => ({
                ...serverAppointment,
                createDateTime: getDateOrDefault(serverAppointment.createDateTime),
                requestedDateTimeOffset: getDateOrDefault(serverAppointment.requestedDateTimeOffset),
                animal: serverAppointment.animal && {
                    ...serverAppointment.animal,
                    species: serverAppointment.animal.species as Species
                }
            }))

            setAppointments(clientAppointments);
        }
        initializeAppointments();
    }, [])

    return (
        <div id="appointments-section">
            <h1>Appointments</h1>
            <div id="appointments-list">
                <ul>
                    {appointments.map(appointment => (
                        <li key={appointment.appointmentId} id={`appointment-${appointment.appointmentId}`}>
                            <AppointmentDetails appointment={appointment} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}