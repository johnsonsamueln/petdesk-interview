using petdesk_interview_app.External.Pstmn.Models;

namespace petdesk_interview_app.External.Pstmn;

public class Pstmn : IPstmn
{
    public Task<Appointment[]> GetAppointments()
    {
        throw new NotImplementedException();
    }
}