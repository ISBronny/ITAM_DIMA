# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /app

# copy csproj and restore as distinct layers
COPY *.sln .
COPY back/Itam.Dima.Api/*.csproj ./back/Itam.Dima.Api/
COPY back/Itam.Dima.Domain/*.csproj ./back/Itam.Dima.Domain/
COPY back/Itam.Dima.Infrastructure/*.csproj ./back/Itam.Dima.Infrastructure/

RUN dotnet restore Itam.Dima.sln

# copy everything else and build app
COPY back/. ./back/
RUN dotnet publish --self-contained false -c Release --no-restore -o /app/publish

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build /app/publish ./
ENTRYPOINT ["dotnet", "Itam.Dima.Api.dll"]
