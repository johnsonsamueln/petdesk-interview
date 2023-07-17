import * as React from "react"
import { Modal } from "react-bootstrap"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Appointment } from "../../../types/appointments/ui"

type RescheduleModalProps = {
    appointment: Appointment;
    onCloseModal: () => void;
    rescheduleAppointment: (appointmentId: number, rescheduleDate: Date) => Promise<void>
}
export const RescheduleModal: React.FC<RescheduleModalProps> = ({ appointment, onCloseModal, rescheduleAppointment }) => {
    const [rescheduleDate, setRescheduleDate] = React.useState(appointment.requestedDate);

    const isDateTodayOrFuture = (date: Date): boolean => {
        const currentDate = new Date();
        const selectedDate = new Date(date);

        return currentDate.getTime() <= selectedDate.getTime();
    }

    const isTimeFuture = (time: Date): boolean => {
        const currentTime = new Date().getTime();
        const selectedTime = new Date(time).getTime();
        return currentTime < selectedTime;
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
                <p>Select a new appointment date:</p>
                <ReactDatePicker
                    selected={rescheduleDate}
                    onChange={setRescheduleDate}
                    showTimeInput
                    showTimeSelect
                    dateFormat="Pp"
                    filterDate={isDateTodayOrFuture}
                    filterTime={isTimeFuture}
                />
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={onCloseModal}>Cancel</button>
                <button className="btn btn-primary" onClick={submitReschedule}>Request reschedule</button>
            </Modal.Footer>
        </Modal>
    )
}