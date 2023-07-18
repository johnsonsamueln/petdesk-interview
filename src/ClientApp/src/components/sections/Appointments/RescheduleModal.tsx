import * as React from "react"
import { Modal } from "react-bootstrap"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Appointment } from "../../../types/appointments/ui"

/**
 * Checks whether the given `date` is today or a future date,
 * irrespective of time-of-day.
 * @param date The `Date` to check for select-ability
 * @returns true if `date` should be selectable, false otherwise
 */
const isDateTodayOrFuture = (date: Date): boolean => {
    // want to compare against the *start* of today
    // (i.e. midnight)
    const currentDateStart = new Date();
    currentDateStart.setHours(0, 0, 0, 0);

    // similar comparison against midnight of selected date
    const selectedDateStart = new Date(date);
    selectedDateStart.setHours(0, 0, 0, 0);

    return currentDateStart.getTime() <= selectedDateStart.getTime();
}

const isDateTimeFuture = (time: Date): boolean => {
    const currentTime = new Date().getTime();
    const selectedTime = new Date(time).getTime();
    return currentTime < selectedTime;
}

type RescheduleModalProps = {
    appointment: Appointment;
    onCloseModal: () => void;
    rescheduleAppointment: (appointmentId: number, rescheduleDate: Date) => Promise<void>
}
export const RescheduleModal: React.FC<RescheduleModalProps> = ({ appointment, onCloseModal, rescheduleAppointment }) => {
    const isRequestedDateValid = !!appointment.requestedDate && isDateTimeFuture(appointment.requestedDate)
    const initialDate = isRequestedDateValid ? appointment.requestedDate : null
    const [rescheduleDate, setRescheduleDate] = React.useState(initialDate);
    const [hasError, setHasError] = React.useState(!isRequestedDateValid)

    const onChangeDate = (date: Date | null) => {
        setRescheduleDate(date);
        const isValidDate = !!date && date.getTime() > new Date().getTime();
        setHasError(!isValidDate);
    }

    const submitReschedule = async () => {
        if (!rescheduleDate) {
            return;
        }
        rescheduleAppointment(appointment.appointmentId, rescheduleDate);
    }

    return (
        <Modal show={true} onHide={onCloseModal}>
            <Modal.Header>
                <Modal.Title>Reschedule Appointment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Patient requested appointment date: <strong>{appointment.requestedDate?.toLocaleString()}</strong></p>
                <p>Select a new appointment date: {"(times are local)"}</p>
                <ReactDatePicker
                    selected={rescheduleDate}
                    onChange={onChangeDate}
                    showTimeInput
                    showTimeSelect
                    dateFormat="Pp"
                    filterDate={isDateTodayOrFuture}
                    filterTime={isDateTimeFuture}
                />
                {hasError && (<p className="text-danger">Please specify a future date.</p>)}
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={onCloseModal}>Cancel</button>
                <button className="btn btn-primary" onClick={submitReschedule} disabled={hasError}>Request reschedule</button>
            </Modal.Footer>
        </Modal>
    )
}