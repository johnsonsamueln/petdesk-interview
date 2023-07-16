using Microsoft.AspNetCore.Mvc;
using ControllerModels = petdesk_interview_app.Controllers.Appointments.Models;
using ExternalModels = petdesk_interview_app.External.Pstmn.Models;
using petdesk_interview_app.External.Pstmn;
using AutoMapper;

namespace petdesk_interview_app.Controllers.Appointments;

[ApiController]
[Route("appointments")]
public class AppointmentsController : ControllerBase
{
    private readonly ILogger<AppointmentsController> logger;
    private readonly IPstmn pstmn;
    private readonly IMapper mapper;

    public AppointmentsController(ILogger<AppointmentsController> logger, IPstmn pstmn, IMapper mapper)
    {
        this.logger = logger;
        this.pstmn = pstmn;
        this.mapper = mapper;
    }

    [HttpGet]
    [Route("")]
    public async Task<ControllerModels.AppointmentResponse> Get()
    {
        var pstmnAppointments = await pstmn.GetAppointments();

        var appointments = mapper.Map<ExternalModels.Appointment[], ControllerModels.Appointment[]>(pstmnAppointments);

        return new ControllerModels.AppointmentResponse()
        {
            Appointments = appointments,
        };
    }

    [HttpPost]
    [Route("confirm")]
    public async Task<IActionResult> Confirm([FromBody] ControllerModels.ConfirmAppointmentRequest request)
    {
        if (request.AppointmentId <= 0)
        {
            return BadRequest($"{nameof(request.AppointmentId)} must be a positive integer. (got {request.AppointmentId})");
        }
        else
        {
            logger.LogInformation($"Confirming appointment {request.AppointmentId}");
            await Task.Delay(millisecondsDelay: 2000);
            return Ok();
        }
    }

    [HttpPost]
    [Route("reschedule")]
    public async Task<IActionResult> Reschedule([FromBody] ControllerModels.RescheduleAppointmentRequest request)
    {
        if (request.AppointmentId <= 0)
        {
            return BadRequest($"{nameof(request.AppointmentId)} must be a positive integer. (got {request.AppointmentId})");
        }
        else if (request.RequestedDateTimeOffset == null || request.RequestedDateTimeOffset <= DateTimeOffset.UtcNow)
        {
            return BadRequest($"{nameof(request.RequestedDateTimeOffset)} must be a future date. (got '{request.RequestedDateTimeOffset?.ToString() ?? "null"}')");
        }
        else
        {
            logger.LogInformation($"Rescheduling appointment {request.AppointmentId} for {request.RequestedDateTimeOffset}");
            await Task.Delay(millisecondsDelay: 2000);
            return Ok();
        }
    }
}
