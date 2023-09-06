# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /source

# copy OpenAPI
COPY OpenAPI/* ./OpenApi/

# copy csproj and restore as distinct layers
COPY *.sln .
COPY back/*.csproj ./back/
RUN dotnet restore

# copy everything else and build app
COPY back/. ./back/
WORKDIR /source/back
RUN dotnet publish -c release -o /app --no-restore

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build /app ./
ENTRYPOINT ["dotnet", "Itam.Dima.Api.dll"]
