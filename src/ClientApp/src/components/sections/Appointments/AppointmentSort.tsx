import * as React from "react"
import { Appointment } from "../../../types/appointments/ui";
import "./AppointmentSort.css"

type AppointmentSortField = {
    field: keyof Appointment,
    label: string,
}
export const sortFields: AppointmentSortField[] = [
    { field: "appointmentStatus", label: "Appointment Status" },
    { field: "appointmentType", label: "Appointment Type" },
    { field: "requestedDate", label: "Patient Requested Date" },
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