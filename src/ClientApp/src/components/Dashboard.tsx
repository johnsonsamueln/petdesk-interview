import * as React from "react"
import "./Dashboard.css"
import { AppointmentsSection } from "./sections/Appointments/AppointmentsSection"

export const Dashboard: React.FC = () => {
    const [shouldShowScrollButton, setShouldShowScrollButton] = React.useState(false);

    React.useEffect(() => {
        const scrollListener = () => {
            const isScrolled = window.scrollY > 300
            setShouldShowScrollButton(isScrolled);
        }
        window.addEventListener("scroll", scrollListener);

        return () => window.removeEventListener("scroll", scrollListener);
    }, [])

    const scrollToTop = () => window.scrollTo(0, 0);

    return (
        <div id="dashboard">
            <header className="dashboard-header">
                <div className="dashboard-header-left">
                    <h1 className="dashboard-header-title">Dashboard</h1>
                </div>
                <div className="dashboard-header-right">
                    {shouldShowScrollButton && (
                        <button className="dashboard-header-top-button" onClick={scrollToTop}>Scroll to top</button>
                    )}
                </div>
            </header>
            <AppointmentsSection />
        </div>
    )
}