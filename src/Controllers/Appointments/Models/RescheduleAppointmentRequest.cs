namespace petdesk_interview_app.Controllers.Appointments.Models;

public class RescheduleAppointmentRequest
{
    public int AppointmentId { get; set; }

    public DateTimeOffset? RequestedDateTimeOffset {get; set;}
}