using petdesk_interview_app.External.Pstmn.Models;

namespace petdesk_interview_app.External.Pstmn;

public class Pstmn : IPstmn
{
    private readonly IHttpClientFactory httpClientFactory;

    public Pstmn(IHttpClientFactory httpClientFactory)
    {
        this.httpClientFactory = httpClientFactory;
    }

    public Task<Appointment[]> GetAppointments()
    {
        throw new NotImplementedException();
    }
}