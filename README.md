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
The `dotnet new react` [template](https://learn.microsoft.com/en-us/aspnet/core/client-side/spa/react?view=aspnetcore-6.0&tabs=netcore-cli) makes use of [Create React App](https://create-react-app.dev/) for its React frontend.

By default, the .NET development server starts on `https://localhost:7241` and `http://localhost:5117`. Visit one of those URLs in your browser (note that the servers use self-signed certificates which your browser may warn you about).

When you visit the .NET development server URL, the .NET server will automatically compile & run the React singe-page-application (SPA) server, referred to as the "SPA Proxy". It will open a new terminal for the SPA server, then redirect your browser to that SPA server.

From then on, the SPA server will proxy requests from the browser to the .NET server.

See more details in the .NET docs
  - [ASP.NET with SPAs](https://learn.microsoft.com/en-us/aspnet/core/client-side/spa/intro?view=aspnetcore-6.0)
  - [ASP.NET with React](https://learn.microsoft.com/en-us/aspnet/core/client-side/spa/react?view=aspnetcore-6.0&tabs=netcore-cli)

## Production
### 1. Publish the ASP.NET app
```sh
[petdesk-interview]$> cd src
[petdesk-interview/src]$> dotnet publish
```

This will not only build the ASP.NET backend, but will also build the React frontend and include its statically-built HTML/JavaScript/CSS in a `wwwroot/` folder with the rest of the built .NET files.

### 2. Run the ASP.NET app
```sh
[petdesk-interview/src]$> cd bin/Debug/net6.0/publish
[petdesk-interview/src/bin/Debug/net6.0/publish]$> ./petdesk-interview-app.exe
```

### 3. Visit the ASP.NET app
By default, the published .NET app executable runs on `https://localhost:5001` and `http://localhost:5000`. Note that the published production version does NOT make use of the "SPA Proxy" -- instead, it serves the HTML/JS/CSS as static assets directly from the ASP.NET server (from the `wwwroot/` folder described above).

See more details in the .NET docs
 - [Published SPAs in ASP.NET](https://learn.microsoft.com/en-us/aspnet/core/client-side/spa/intro?view=aspnetcore-6.0#published-single-page-apps)

## Unit Tests
Unit tests are written with MSTest.

### Run unit tests
```sh
[petdesk-interview]$> cd tests
[petdesk-interview/tests]$> dotnet test
```

### Code Coverage Report
There are many ways to get code coverage reports from unit tests. Described here is how to do so with the dotnet CLI reportgenerator tool (from [.NET docs](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-code-coverage?tabs=windows#integrate-with-net-test))

#### 1. Install reportgenerator tool in dotnet CLI
```sh
dotnet tool install -g dotnet-reportgenerator-globaltool
```

#### 2. Run unit tests with coverage collection
```sh
[petdesk-interview/tests]$> dotnet test --collect:"XPlat Code Coverage"
```

#### 3. Use reportgenerator to generate code coverage report
```sh
[petdesk-interview/tests]$> reportgenerator \
-reports:"TestResults/**/*.cobertura.xml" \
-targetdir:"coveragereport" \
-reporttypes:Html
```

#### 4. View coverage report
The coverage report files are placed under `tests/coveragereport/`. The `tests/coveragereport/index.html` can be opened in your browser, and will take you through viewing the coverage.

See more details at [ReportGenerator](https://reportgenerator.io/)