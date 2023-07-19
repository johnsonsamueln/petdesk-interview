using AutoMapper;
using ExpectedObjects;
using petdesk_interview_app.Controllers.Appointments.Mappers;
using ControllerModels = petdesk_interview_app.Controllers.Appointments.Models;
using ExternalModels = petdesk_interview_app.External.Pstmn.Models;

namespace petdesk_interview_app_tests;

[TestClass]
public class AppointmentMappingProfileTests
{
    [TestMethod]
    public void MapsToExpectedObject()
    {
        // Arrange
        var expectedControllerModel = new ControllerModels.Appointment()
        {
            AppointmentId = 123,
            AppointmentType = "mock-AppointmentType",
            CreateDateTime = DateTime.Now,
            RequestedDateTimeOffset = DateTimeOffset.Now,
            User = new ControllerModels.User()
            {
                UserId = 456,
                GivenName = "mock-GivenName",
                FamilyName = "mock-FamilyName",
                VetDataId = "mock-VetDataId",
            },
            Animal = new ControllerModels.Animal()
            {
                AnimalId = 789,
                GivenName = "mock-GivenName",
                Species = "mock-Species",
                Breed = "mock-Breed",
            }
        };

        var externalModel = new ExternalModels.Appointment()
        {
            AppointmentId = expectedControllerModel.AppointmentId,
            AppointmentType = expectedControllerModel.AppointmentType,
            CreateDateTime = expectedControllerModel.CreateDateTime,
            RequestedDateTimeOffset = expectedControllerModel.RequestedDateTimeOffset,
            User = new ExternalModels.User()
            {
                UserId = expectedControllerModel.User.UserId,
                FirstName = expectedControllerModel.User.GivenName,
                LastName = expectedControllerModel.User.FamilyName,
                VetDataId = expectedControllerModel.User.VetDataId,
            },
            Animal = new ExternalModels.Animal()
            {
                AnimalId = expectedControllerModel.Animal.AnimalId,
                FirstName = expectedControllerModel.Animal.GivenName,
                Species = expectedControllerModel.Animal.Species,
                Breed = expectedControllerModel.Animal.Breed,
            }
        };

        var config = new MapperConfiguration(cfg => cfg.AddProfile<AppointmentMappingProfile>());
        var mapper = config.CreateMapper();

        // Act
        var actualControllerModel = mapper.Map<ExternalModels.Appointment, ControllerModels.Appointment>(externalModel);

        // Assert
        expectedControllerModel.ToExpectedObject().ShouldEqual(actualControllerModel);
    }
}