using Microsoft.AspNetCore.Mvc;
using petdesk_interview_app.Controllers.Appointments.Models;
using petdesk_interview_app.External.Pstmn;

namespace petdesk_interview_app.Controllers.Appointments;

[ApiController]
[Route("[controller]")]
public class AppointmentsController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<AppointmentsController> logger;
    private readonly IPstmn pstmn;

    public AppointmentsController(ILogger<AppointmentsController> logger, IPstmn pstmn)
    {
        this.logger = logger;
        this.pstmn = pstmn;
    }

    [HttpGet]
    public async Task<AppointmentResponse> Get()
    {
        var pstmnAppointments = await pstmn.GetAppointments();

        var appointments = Enumerable.Range(1, 5).Select(index => new Appointment
        {
            Date = DateTime.Now.AddDays(index),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        }).ToArray();

        return new AppointmentResponse()
        {
            Appointments = appointments
        };
    }
}
