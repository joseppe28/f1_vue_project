# F1 Vue project

Vue reads saved MySQL data through the C# project in ../F1_Webservice.

Configure MySQL using that project's README, then import from its directory:

```powershell
dotnet run -- --environment Development --import 2024
```

Start the C# HTTP server separately:

```powershell
dotnet run -- --environment Development
```

Start Vue from this directory:

```powershell
npm install
npm run serve
```

Vue's /api requests are forwarded to http://localhost:5050 by vue.config.js.
The service uses DbManager.cs for reads and Controllers/F1Controller.cs for HTTP
endpoints. Starting it does not import data. For production, configure an equivalent
/api reverse proxy. Build Vue with npm run build.
