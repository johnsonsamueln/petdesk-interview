import * as React from "react"
import { Appointment } from "../../../types/appointments/ui"

type RescheduleModalProps = {
    appointment: Appointment;
    onCloseModal: () => void;
}
export const RescheduleModal : React.FC<RescheduleModalProps> = () => {
    return (
        <div className="modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">Reschedule Appointment</div>
                    <div className="modal-body">Select a new appointment date:</div>
                    <div className="modal-footer">
                        <button>Cancel</button>
                        <button>Request reschedule</button>
                    </div>
                </div>
            </div>
        </div>
    )
}