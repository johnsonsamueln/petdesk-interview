using AutoMapper;
using Microsoft.Extensions.Logging;
using Moq;
using petdesk_interview_app.Controllers.Appointments;
using petdesk_interview_app.External.Pstmn;

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
}