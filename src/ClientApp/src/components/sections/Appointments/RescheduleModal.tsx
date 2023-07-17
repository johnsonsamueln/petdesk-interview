import * as React from "react"
import { Modal } from "react-bootstrap"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Appointment } from "../../../types/appointments/ui"

type RescheduleModalProps = {
    appointment: Appointment;
    onCloseModal: () => void;
}
export const RescheduleModal: React.FC<RescheduleModalProps> = ({ appointment, onCloseModal }) => {
    const [rescheduleDate, setRescheduleDate] = React.useState(appointment.requestedDate);
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
                />
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={onCloseModal}>Cancel</button>
                <button className="btn btn-primary">Request reschedule</button>
            </Modal.Footer>
        </Modal>
    )
}