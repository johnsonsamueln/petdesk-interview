import * as React from "react"
import { Appointment, AppointmentStatus, Species } from "../../../types/appointments/ui"
import { AppointmentResponse } from "../../../types/appointments/api";
import { getDateOrDefault } from "../../../helpers/date";
import { API_ROUTES } from "../../../constants/api-routes";
import { AppointmentDetails } from "./AppointmentDetails";
import "./AppointmentsSection.css"

export const AppointmentsSection: React.FC = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [appointments, setAppointments] = React.useState<Appointment[]>([]);

    React.useEffect(() => {
        async function initializeAppointments() {
            const fetchResponse = await fetch(API_ROUTES.APPOINTMENTS_GET, { method: "GET" });
            const appointmentsResponse: AppointmentResponse = await fetchResponse.json();

            const clientAppointments: Appointment[] = toUIAppointments(appointmentsResponse);

            setAppointments(clientAppointments);
            setIsLoading(false);
        }
        initializeAppointments();
    }, [])

    const confirmAppointment = async (appointmentId: number) => {
        const confirmRequest = { appointmentId };
        const fetchResponse = await fetch(API_ROUTES.APPOINTMENT_CONFIRM, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(confirmRequest)
        });

        if (fetchResponse.ok) {
            setAppointmentStatus(appointmentId, AppointmentStatus.ConfirmedByVet);
        }
    }

    const rescheduleAppointment = async (appointmentId: number, requestedDate: Date) => {
        const rescheduleRequest = { appointmentId, requestedDate };
        const fetchResponse = await fetch(API_ROUTES.APPOINTMENT_RESCHEDULE, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(rescheduleRequest)
        });

        if (fetchResponse.ok) {
            setAppointmentStatus(appointmentId, AppointmentStatus.RescheduleRequestedByVet);
        }
    }

    const setAppointmentStatus = async (appointmentId: number, appointmentStatus: AppointmentStatus) => {
        setAppointments(prevAppointments => {
            const confirmedAppointment = prevAppointments.find(appointment => appointment.appointmentId === appointmentId);
            if (confirmedAppointment) {
                confirmedAppointment.appointmentStatus = appointmentStatus;
            }
            return prevAppointments;
        })
    }

    return (
        <div id="appointments-section" className="container">
            <h1>Appointments</h1>
            <ul id="appointments-list" className="appointments-list">
                {isLoading && (<span className="spinner-border" />)}
                {appointments.map(appointment => (
                    <li key={appointment.appointmentId} id={`appointment-${appointment.appointmentId}`}>
                        <AppointmentDetails appointment={appointment} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

const toUIAppointments = (appointmentsResponse: AppointmentResponse): Appointment[] => {
    return appointmentsResponse.appointments.map(serverAppointment => ({
        ...serverAppointment,
        appointmentStatus: AppointmentStatus.NewPatientRequest,
        createDateTime: getDateOrDefault(serverAppointment.createDateTime),
        requestedDateTimeOffset: getDateOrDefault(serverAppointment.requestedDateTimeOffset),
        animal: serverAppointment.animal && {
            ...serverAppointment.animal,
            species: serverAppointment.animal.species as Species
        }
    }))
}