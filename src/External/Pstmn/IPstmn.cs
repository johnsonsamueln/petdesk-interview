using petdesk_interview_app.External.Pstmn.Models;

namespace petdesk_interview_app.External.Pstmn;

public interface IPstmn
{
    Task<Appointment[]> GetAppointments();
}