# petdesk-interview
2023 Interview project

This is a web app running .NET 6, ASP.NET Core with React

## Prerequisites
 - .NET 6 SDK
 - NodeJS 18

## Build & Run

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
The `dotnet new react` [template](https://learn.microsoft.com/en-us/aspnet/core/client-side/spa/react?view=aspnetcore-6.0&tabs=netcore-cli) makes use of [Create React App](https://create-react-app.dev/).

By default, the development server starts on `https://localhost:7241` and `http://localhost:5117`. Visit one of those URLs in your browser (note that the `https` server has a self-signed certificate which your browser may warn you about).

When you visit that URL, the .NET server will automatically compile & run the React singe-page-application (SPA) using a "SPA Proxy". It will open a new terminal for the SPA server, then redirect you to that SPA server in your browser.