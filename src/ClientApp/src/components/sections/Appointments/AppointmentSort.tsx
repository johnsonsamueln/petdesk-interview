import * as React from "react"
import { Appointment, AppointmentStatus } from "../../../types/appointments/ui";
import "./AppointmentSort.css"

type AppointmentSortField = {
    field: keyof Appointment,
    label: string,
}
export const sortFields: AppointmentSortField[] = [
    { field: "appointmentStatus", label: "Appointment Status" },
    { field: "appointmentType", label: "Appointment Type" },
    { field: "requestedDate", label: "Appointment Date" },
]

export enum SortDirection {
    Ascending = "asc",
    Descending = "desc"
}
export type AppointmentSortSettings = {
    field: keyof Appointment;
    direction: SortDirection
}
export const getSortedAppointments = (apppointments: Appointment[], sortSettings: AppointmentSortSettings): Appointment[] => {
    const sortedAppointments = [...apppointments];
    sortedAppointments.sort((lhs, rhs) => {
        const { field, direction } = sortSettings;

        let compareValue: number
        if (field === "appointmentType") {
            compareValue = compareAppoinmentType(lhs, rhs);
        } else if (field === "appointmentStatus") {
            compareValue = compareAppointmentStatus(lhs, rhs);
        } else if (field === "requestedDate") {
            compareValue = compareAppoinmentDate(lhs, rhs);
        } else {
            compareValue = 0;
        }
        return direction === SortDirection.Ascending ? compareValue : -compareValue;
    });
    return sortedAppointments;
};

type AppointmentSortProps = {
    sortSettings: AppointmentSortSettings,
    onChangeSortField: (field: AppointmentSortSettings["field"]) => void;
    onChangeSortDirection: (direction: AppointmentSortSettings["direction"]) => void;
}
export const AppointmentSort: React.FC<AppointmentSortProps> = ({ sortSettings, onChangeSortField, onChangeSortDirection }) => {
    return (
        <div className="appointment-sort">
            <select
                className="appointment-sort-select"
                value={sortSettings.field}
                onChange={(event) => onChangeSortField(event.target.value as AppointmentSortSettings["field"])}
            >
                {sortFields.map(({ field, label }) => (
                    <option key={field} value={field}>{label}</option>
                ))}
            </select>
            <select
                className="appointment-sort-select"
                value={sortSettings.direction}
                onChange={(event) => onChangeSortDirection(event.target.value as AppointmentSortSettings["direction"])}
            >
                <option value={SortDirection.Ascending}>↑ Ascending</option>
                <option value={SortDirection.Descending}>↓ Descending</option>
            </select>
        </div>
    )
}

const compareAppoinmentType = (lhs: Appointment, rhs: Appointment) => {
    const lhsType = lhs.appointmentType || "";
    const rhsType = rhs.appointmentType || "";

    return lhsType.localeCompare(rhsType);
}

const compareAppoinmentDate = (lhs: Appointment, rhs: Appointment) => {
    const lhsDate = lhs.requestedDate;
    const lhsUnixTime = lhsDate?.getTime() || 0;

    const rhsDate = rhs.requestedDate;
    const rhsUnixTime = rhsDate?.getTime() || 0;

    return lhsUnixTime - rhsUnixTime;
}

const STATUS_SORT_ORDER = [
    AppointmentStatus.NewPatientRequest,
    AppointmentStatus.RescheduleRequestedByVet,
    AppointmentStatus.ConfirmedByVet
]
const compareAppointmentStatus = (lhs: Appointment, rhs: Appointment) => {
    const lhsStatus = lhs.appointmentStatus;
    const lhsIndex = STATUS_SORT_ORDER.indexOf(lhsStatus);

    const rhsStatus = rhs.appointmentStatus;
    const rhsIndex = STATUS_SORT_ORDER.indexOf(rhsStatus);

    return lhsIndex - rhsIndex;
}
