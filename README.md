# petdesk-interview
2023 Interview project

This is a web app running .NET 6, ASP.NET Core with React

## Prerequisites
 - .NET 6 SDK
    - Development: build & runtime
    - Production: build & runtime
 - NodeJS 18
    - Development: build & runtime
    - Production: build only

## Development

### 1. Build the .NET app
```sh
[petdesk-interview]$> cd src
[petdesk-interview/src]$> dotnet build
```

### 2. Run the app
```sh
[petdesk-interview/src]$> dotnet run
```

### 3. Hit the development server locally
The `dotnet new react` [template](https://learn.microsoft.com/en-us/aspnet/core/client-side/spa/react?view=aspnetcore-6.0&tabs=netcore-cli) makes use of [Create React App](https://create-react-app.dev/) as its React frontend.

By default, the .NET development server starts on `https://localhost:7241` and `http://localhost:5117`. Visit one of those URLs in your browser (note that the servers use a self-signed certificates which your browser may warn you about).

When you visit the .NET development URL, the .NET server will automatically compile & run the React singe-page-application (SPA) server, referred to as the "SPA Proxy". It will open a new terminal for the SPA server, then redirect your browser to that SPA server.

From then on, the SPA server will proxy requests from the browser to the .NET server.

See more details in the .NET docs
  - [ASP.NET with SPAs](https://learn.microsoft.com/en-us/aspnet/core/client-side/spa/intro?view=aspnetcore-6.0)
  - [ASP.NET with React](https://learn.microsoft.com/en-us/aspnet/core/client-side/spa/react?view=aspnetcore-6.0&tabs=netcore-cli)

## Production