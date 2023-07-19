import * as React from "react"
import "./Dashboard.css"
import { AppointmentsSection } from "./sections/Appointments/AppointmentsSection"

export const Dashboard: React.FC = () => {
    return (
        <div id="dashboard">
            <header className="dashboard-header">
                <div className="dashboard-header-left">
                    <h1 className="dashboard-header-title">Dashboard</h1>
                </div>
                <div className="dashboard-header-right">
                    <button className="dashboard-header-top-button">Scroll to top</button>
                </div>
            </header>
            <AppointmentsSection />
        </div>
    )
}