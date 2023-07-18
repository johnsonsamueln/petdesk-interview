import * as React from "react"
import { Modal } from "react-bootstrap"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Appointment } from "../../../types/appointments/ui"
import { isDateTimeFuture, isDateTodayOrFuture } from "../../../helpers/date"

type RescheduleModalProps = {
    appointment: Appointment;
    onCloseModal: () => void;
    rescheduleAppointment: (appointmentId: number, rescheduleDate: Date) => Promise<void>
}
export const RescheduleModal: React.FC<RescheduleModalProps> = ({ appointment, onCloseModal, rescheduleAppointment }) => {
    const isRequestedDateValid = isDateTimeFuture(appointment.requestedDate) 
    const initialDate = isRequestedDateValid ? appointment.requestedDate : null
    const [rescheduleDate, setRescheduleDate] = React.useState(initialDate);
    const [hasError, setHasError] = React.useState(!isRequestedDateValid)

    const onChangeDate = (date: Date | null) => {
        setRescheduleDate(date);
        const isRescheduleValidDate = isDateTimeFuture(date);
        setHasError(!isRescheduleValidDate);
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