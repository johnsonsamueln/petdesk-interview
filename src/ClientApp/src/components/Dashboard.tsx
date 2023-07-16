import * as React from "react"
import "./Dashboard.css"
import { AppointmentsSection } from "./sections/Appointments/AppointmentsSection"

export const Dashboard: React.FC = () => {
    return (
        <div id="dashboard">
            <h1 className="title">Dashboard</h1>
            <AppointmentsSection />
        </div>
    )
}