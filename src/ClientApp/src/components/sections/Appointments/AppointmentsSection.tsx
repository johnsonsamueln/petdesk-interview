import * as React from "react"
import { Animal, Appointment, AppointmentStatus, Species, User } from "../../../types/appointments/ui"
import { AppointmentResponse, ConfirmAppointmentRequest, RescheduleAppointmentRequest } from "../../../types/appointments/api";
import { getDateOrDefault } from "../../../helpers/date";
import { API_ROUTES } from "../../../constants/api-routes";
import { AppointmentDetails } from "./AppointmentDetails";
import "./AppointmentsSection.css"
import { FixedSpinner } from "../../FixedSpinner";

const sortFields: Array<keyof Appointment> = ["appointmentStatus", "appointmentType", "requestedDate"]
type AppointmentSort = {
    field: keyof Appointment;
    direction: "asc" | "desc"
}
const getSortedAppointments = (apppointments: Appointment[], sort: AppointmentSort): Appointment[] => {
    const sortedAppointments = [...apppointments];
    sortedAppointments.sort((lhs, rhs) => {
        const { field, direction } = sort;

        let compareValue: number
        if (field === "appointmentStatus" || field === "appointmentType") {
            const lhsField = lhs[field] || "";
            const rhsField = rhs[field] || "";

            compareValue = lhsField.localeCompare(rhsField);
        } else if (field === "requestedDate") {
            const lhsField = lhs[field];
            const lhsUnixTime = lhsField?.getTime() || 0;

            const rhsField = rhs[field];
            const rhsUnixTime = rhsField?.getTime() || 0;

            compareValue = lhsUnixTime - rhsUnixTime;
        } else {
            compareValue = 0;
        }
        return direction === "asc" ? compareValue : -compareValue;
    });
    return sortedAppointments;
};

export const AppointmentsSection: React.FC = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [appointments, setAppointments] = React.useState<Appointment[]>([]);
    const [sort, setSort] = React.useState<AppointmentSort>({ field: "requestedDate", direction: "asc" })

    React.useEffect(() => {
        async function initializeAppointments() {
            const fetchResponse = await fetch(API_ROUTES.APPOINTMENTS_GET, { method: "GET" });
            const appointmentsResponse: AppointmentResponse = await fetchResponse.json();

            const clientAppointments: Appointment[] = toUIAppointments(appointmentsResponse);
            const sortedAppointments = getSortedAppointments(clientAppointments, sort);

            setAppointments(sortedAppointments);
            setIsLoading(false);
        }
        initializeAppointments();
    }, [])

    React.useEffect(() => {
        setAppointments(prevAppointments => getSortedAppointments(prevAppointments, sort));
    }, [sort])

    const confirmAppointment = async (appointmentId: number) => {
        setIsLoading(true);
        const confirmRequest: ConfirmAppointmentRequest = { appointmentId };
        const fetchResponse = await fetch(API_ROUTES.APPOINTMENT_CONFIRM, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(confirmRequest)
        });

        if (fetchResponse.ok) {
            setAppointmentStatus(appointmentId, AppointmentStatus.ConfirmedByVet);
        }
        setIsLoading(false);
    }

    const rescheduleAppointment = async (appointmentId: number, requestedDate: Date) => {
        setIsLoading(true);
        const rescheduleRequest: RescheduleAppointmentRequest = { appointmentId, requestedDateTimeOffset: requestedDate.toISOString() };
        const fetchResponse = await fetch(API_ROUTES.APPOINTMENT_RESCHEDULE, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(rescheduleRequest)
        });

        if (fetchResponse.ok) {
            setAppointmentStatus(appointmentId, AppointmentStatus.RescheduleRequestedByVet);
        }
        setIsLoading(false);
    }

    const setAppointmentStatus = async (appointmentId: number, appointmentStatus: AppointmentStatus) => {
        setAppointments(prevAppointments => prevAppointments.map(appointment => {
            if (appointment.appointmentId === appointmentId) {
                return { ...appointment, appointmentStatus }
            } else {
                return appointment;
            }
        }))
    }

    return (
        <div id="appointments-section" className="container">
            <h1>Appointments</h1>
            <select value={sort.field} onChange={(event) => setSort(prevSort => ({...prevSort, field: event.target.value as any }))}>
                {sortFields.map(field => (
                    <option key={field} value={field}>{field}</option>
                ))}
            </select>
            <ul id="appointments-list" className="appointments-list">
                {isLoading && (<FixedSpinner />)}
                {appointments.map(appointment => (
                    <li key={appointment.appointmentId} id={`appointment-${appointment.appointmentId}`}>
                        <AppointmentDetails
                            appointment={appointment}
                            confirmAppointment={confirmAppointment}
                            rescheduleAppointment={rescheduleAppointment}
                        />
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
        requestedDate: getDateOrDefault(serverAppointment.requestedDateTimeOffset),
        animal: serverAppointment.animal && {
            ...serverAppointment.animal,
            species: serverAppointment.animal.species as Species
        }
    }))
}