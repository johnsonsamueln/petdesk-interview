import * as React from "react"

export const RescheduleModal : React.FC = () => {
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