import * as React from "react"
import { Appointment, AppointmentStatus, Species } from "../../../types/appointments/ui"
import { AppointmentResponse, ConfirmAppointmentRequest, RescheduleAppointmentRequest } from "../../../types/appointments/api";
import { getDateOrDefault } from "../../../helpers/date";
import { API_ROUTES } from "../../../constants/api-routes";
import { AppointmentDetails } from "./AppointmentDetails";
import "./AppointmentsSection.css"
import { FixedSpinner } from "../../FixedSpinner";

type AppointmentSortField = {
    field: keyof Appointment,
    label: string,
}
const sortFields: AppointmentSortField[] = [
    { field: "appointmentStatus", label: "Appointment Status" },
    { field: "appointmentType", label: "Appointment Type" },
    { field: "requestedDate", label: "Patient Requested Date" },
]

enum SortDirection {
    Ascending = "asc",
    Descending = "desc"
}
type AppointmentSortSettings = {
    field: keyof Appointment;
    direction: SortDirection
}
const getSortedAppointments = (apppointments: Appointment[], sortSettings: AppointmentSortSettings): Appointment[] => {
    const sortedAppointments = [...apppointments];
    sortedAppointments.sort((lhs, rhs) => {
        const { field, direction } = sortSettings;

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
        return direction === SortDirection.Ascending ? compareValue : -compareValue;
    });
    return sortedAppointments;
};

export const AppointmentsSection: React.FC = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [appointments, setAppointments] = React.useState<Appointment[]>([]);
    const [sortSettings, setSortSettings] = React.useState<AppointmentSortSettings>({ field: "requestedDate", direction: SortDirection.Ascending })

    const sortedAppointments = React.useMemo(() => getSortedAppointments(appointments, sortSettings), [appointments, sortSettings]);

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

    const setSortField = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const field = event.target.value as AppointmentSortSettings["field"];
        setSortSettings(prevSort => ({ ...prevSort, field }))
    };

    const setSortDirection = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const direction = event.target.value as AppointmentSortSettings["direction"];
        setSortSettings(prevSort => ({ ...prevSort, direction }))
    }

    return (
        <div id="appointments-section" className="container">
            <h1>Appointments</h1>
            <div>
                <select value={sortSettings.field} onChange={setSortField}>
                    {sortFields.map(({ field, label }) => (
                        <option key={field} value={field}>{label}</option>
                    ))}
                </select>
                <select value={sortSettings.direction} onChange={setSortDirection}>
                    <option value={SortDirection.Ascending}>Ascending</option>
                    <option value={SortDirection.Descending}>Descending</option>
                </select>
            </div>
            <ul id="appointments-list" className="appointments-list">
                {isLoading && (<FixedSpinner />)}
                {sortedAppointments.map(appointment => (
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