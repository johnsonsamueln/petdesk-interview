namespace petdesk_interview_app.Controllers.Appointments.Mappers;
using ControllerModels = petdesk_interview_app.Controllers.Appointments.Models;
using ExternalModels = petdesk_interview_app.External.Pstmn.Models;


public class AppointmentMappingProfile : AutoMapper.Profile
{
    public AppointmentMappingProfile() {
        CreateMap<ExternalModels.Appointment, ControllerModels.Appointment>();

        CreateMap<ExternalModels.User, ControllerModels.User>()
            .ForMember(dest => dest.GivenName, options => options.MapFrom(src => src.FirstName))
            .ForMember(dest => dest.FamilyName, options => options.MapFrom(src => src.LastName));

        CreateMap<ExternalModels.Animal, ControllerModels.Animal>()
            .ForMember(dest => dest.GivenName, options => options.MapFrom(src => src.FirstName));
    }
}