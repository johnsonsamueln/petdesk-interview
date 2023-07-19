import * as React from "react"
import "./Dashboard.css"
import { AppointmentsSection } from "./sections/Appointments/AppointmentsSection"

export const Dashboard: React.FC = () => {
    return (
        <div id="dashboard">
            <header className="dashboard-header">
                <h1>Dashboard</h1>
            </header>
            <AppointmentsSection />
        </div>
    )
}