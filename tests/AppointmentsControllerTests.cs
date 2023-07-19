using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using petdesk_interview_app.Controllers.Appointments;
using petdesk_interview_app.External.Pstmn;
using ControllerModels = petdesk_interview_app.Controllers.Appointments.Models;
using ExternalModels = petdesk_interview_app.External.Pstmn.Models;

namespace petdesk_interview_app_tests;

[TestClass]
public class AppointmentsControllerTests
{
    private readonly AppointmentsController sut;

    private readonly Mock<ILogger<AppointmentsController>> mockLogger;
    private readonly Mock<IPstmn> mockPstmn;
    private readonly Mock<IMapper> mockMapper;

    public AppointmentsControllerTests()
    {
        mockLogger = new Mock<ILogger<AppointmentsController>>();
        mockPstmn = new Mock<IPstmn>();
        mockMapper = new Mock<IMapper>();

        sut = new AppointmentsController(mockLogger.Object, mockPstmn.Object, mockMapper.Object);
    }

    [TestMethod]
    public async Task GetAppointments_CallsPstmnGetAppointments()
    {
        // Arrange

        // Act
        await sut.GetAppointments();

        // Assert
        mockPstmn.Verify(pstm => pstm.GetAppointments(), Times.Once);
    }

    [TestMethod]
    public async Task GetAppointments_PstmnReturnsAppointments_CallsMapper_WithPstmnAppointments()
    {
        // Arrange
        var pstmnAppointments = new ExternalModels.Appointment[] { new ExternalModels.Appointment() };
        mockPstmn.Setup(pstm => pstm.GetAppointments())
            .ReturnsAsync(pstmnAppointments);

        // Act
        await sut.GetAppointments();

        // Assert
        mockMapper.Verify(mapper => mapper.Map<ExternalModels.Appointment[], ControllerModels.Appointment[]>(pstmnAppointments), Times.Once);
    }

    [TestMethod]
    public async Task GetAppointments_MapperReturnsAppointments_ReturnsResponse_WithMappedAppointments()
    {
        // Arrange
        var expectedAppointments = new ControllerModels.Appointment[] { new ControllerModels.Appointment() };
        mockMapper.Setup(mapper => mapper.Map<ExternalModels.Appointment[], ControllerModels.Appointment[]>(It.IsAny<ExternalModels.Appointment[]>()))
            .Returns(expectedAppointments);

        // Act
        var response = await sut.GetAppointments();

        // Assert
        Assert.IsNotNull(response);
        var actualAppointments = response.Appointments;
        CollectionAssert.AreEquivalent(expectedAppointments, actualAppointments?.ToArray());
    }

    [TestMethod]
    [DataRow(0)]
    [DataRow(-1)]
    public async Task ConfirmAppointment_AppointmentIdInvalid_ReturnsResponse_WithBadRequest(int appointmentId)
    {
        // Arrange
        var request = new ControllerModels.ConfirmAppointmentRequest()
        {
            AppointmentId = appointmentId
        };

        // Act
        var actionResult = await sut.ConfirmAppointment(request);

        // Assert
        Assert.IsNotNull(actionResult);
        Assert.IsInstanceOfType(actionResult, typeof(BadRequestObjectResult));
    }

    [TestMethod]
    [DataRow(0)]
    [DataRow(-1)]
    public async Task RescheduleAppointment_AppointmentIdInvalid_ReturnsResponse_WithBadRequest(int appointmentId)
    {
        // Arrange
        var request = new ControllerModels.RescheduleAppointmentRequest()
        {
            AppointmentId = appointmentId
        };

        // Act
        var actionResult = await sut.RescheduleAppointment(request);

        // Assert
        Assert.IsNotNull(actionResult);
        Assert.IsInstanceOfType(actionResult, typeof(BadRequestObjectResult));
    }

    [TestMethod]
    [DataRow(null)]
    [DataRow("1985-10-21T00:00:00")]
    public async Task RescheduleAppointment_RequestedDateTimeOffsetInvalid_ReturnsResponse_WithBadRequest(string? requestedDateTimeOffsetStr)
    {
        // Arrange
        DateTimeOffset? requestedDateTimeOffset;
        if (requestedDateTimeOffsetStr == null)
        {
            requestedDateTimeOffset = null;
        }
        else
        {
            requestedDateTimeOffset = DateTimeOffset.Parse(requestedDateTimeOffsetStr);
        }

        var request = new ControllerModels.RescheduleAppointmentRequest()
        {
            AppointmentId = 123,
            RequestedDateTimeOffset = requestedDateTimeOffset
        };

        // Act
        var actionResult = await sut.RescheduleAppointment(request);

        // Assert
        Assert.IsNotNull(actionResult);
        Assert.IsInstanceOfType(actionResult, typeof(BadRequestObjectResult));
    }
}