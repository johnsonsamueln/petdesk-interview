namespace petdesk_interview_app.Controllers.Appointments.Models;

public class Appointment
{
    public int AppointmentId { get; set; }
    public string? AppointmentType { get; set; }
    public DateTime? CreateDateTime { get; set; }
    public DateTimeOffset? RequestedDateTimeOffset { get; set; }
    public User? User { get; set; }
    public Animal? Animal { get; set; }
}