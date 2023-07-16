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
        var requestUri = new Uri("https://723fac0a-1bff-4a20-bdaa-c625eae11567.mock.pstmn.io/appointments");
        var deserializeOptions = new JsonSerializerOptions() { PropertyNameCaseInsensitive = true };

        var appointments = await HttpGet<Appointment[]>(requestUri, deserializeOptions);
        if (appointments == null)
        {
            return Array.Empty<Appointment>();
        }
        else
        {
            return appointments;
        }
    }

    private async Task<T?> HttpGet<T>(Uri requestUri, JsonSerializerOptions? deserializeOptions = null)
    {
        var requestMessage = new HttpRequestMessage(HttpMethod.Get, requestUri);

        var httpClient = httpClientFactory.CreateClient();
        var responseMessage = await httpClient.SendAsync(requestMessage);

        responseMessage.EnsureSuccessStatusCode();
        using var contentStream = await responseMessage.Content.ReadAsStreamAsync();

        var responseBody = await JsonSerializer.DeserializeAsync<T>(contentStream, deserializeOptions);

        return responseBody;
    }
}