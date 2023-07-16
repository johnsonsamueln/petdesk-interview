﻿using Microsoft.AspNetCore.Mvc;
using ControllerModels = petdesk_interview_app.Controllers.Appointments.Models;
using ExternalModels = petdesk_interview_app.External.Pstmn.Models;
using petdesk_interview_app.External.Pstmn;
using AutoMapper;

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
    private readonly IMapper mapper;

    public AppointmentsController(ILogger<AppointmentsController> logger, IPstmn pstmn, IMapper mapper)
    {
        this.logger = logger;
        this.pstmn = pstmn;
        this.mapper = mapper;
    }

    [HttpGet]
    public async Task<ControllerModels.AppointmentResponse> Get()
    {
        var pstmnAppointments = await pstmn.GetAppointments();

        return new ControllerModels.AppointmentResponse()
        {
            Appointments  = Array.Empty<ControllerModels.Appointment>(),
        };
    }
}
