using System.Text.Json;
using petdesk_interview_app.External.Pstmn.Models;

namespace petdesk_interview_app.External.Pstmn;

public class Pstmn : IPstmn
{
    private readonly IHttpClientFactory httpClientFactory;

    public Pstmn(IHttpClientFactory httpClientFactory)
    {
        this.httpClientFactory = httpClientFactory;
    }

    public async Task<Appointment[]> GetAppointments()
    {
        var requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://723fac0a-1bff-4a20-bdaa-c625eae11567.mock.pstmn.io/appointments");

        var httpClient = httpClientFactory.CreateClient();
        var responseMessage = await httpClient.SendAsync(requestMessage);

        responseMessage.EnsureSuccessStatusCode();
        using var contentStream = await responseMessage.Content.ReadAsStreamAsync();

        var appointments = await JsonSerializer.DeserializeAsync<Appointment[]>(contentStream, new JsonSerializerOptions() { PropertyNameCaseInsensitive = true });
        if (appointments == null)
        {
            return Array.Empty<Appointment>();
        }
        else
        {
            return appointments;
        }
    }
}