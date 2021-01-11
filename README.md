# Software Quiz

## OSU-467-W21

### Members

- Clifford (Mason) Reiselt

## Prerequisites

- nodejs LTS (https://nodejs.org/en/download/)
- dotnet core 5 SDK (https://dotnet.microsoft.com/download/dotnet/5.0)

## Development Prerequisites

- eslint: `npm i --global eslint`
- dotnet entity frame work tool
  - after installing sdk run `dotnet tool install --global dotnet-ef`
- VS Code extensions (if using):
  - Prettier
  - EditorConfig
  - C#
  - ESLint

If not using VS Code, please ensure your editor supports Prettier and EditorConfig files to prevent constant git changes over formatting.

## Running Server

- `dotnet run` in the root director or from VS Code runner `.NET Core Launch (web)`
- Open browser to http://localhost:5000 or https://localhost:5001
