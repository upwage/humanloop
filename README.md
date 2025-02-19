# Humanloop Workbench / Crash Evaluation

* Start:
`docker compose up`

* Error:
```
workbench-1  | Debugger listening on ws://127.0.0.1:9229/ed219f95-0c41-4250-8af1-3e130c0f179a
workbench-1  | For help, see: https://nodejs.org/en/docs/inspector
workbench-1  | /usr/src/app/node_modules/humanloop/eval_utils/run.js:188
workbench-1  |                 try {
workbench-1  |                                       ^
workbench-1  | 
workbench-1  | Error [ERR_REQUIRE_ESM]: require() of ES Module /usr/src/app/node_modules/p-map/index.js from /usr/src/app/node_modules/humanloop/eval_utils/run.js not supported.
workbench-1  | Instead change the require of index.js in /usr/src/app/node_modules/humanloop/eval_utils/run.js to a dynamic import() which is available in all CommonJS modules.
workbench-1  |     at Hook._require.Module.require (/usr/src/app/node_modules/@newrelic/ritm/index.js:188:39)
workbench-1  |     at Object.<anonymous> (/usr/src/app/node_modules/humanloop/eval_utils/run.js:45:33)
workbench-1  |     at Hook._require.Module.require (/usr/src/app/node_modules/@newrelic/ritm/index.js:188:39)
workbench-1  |     at Object.<anonymous> (/usr/src/app/node_modules/humanloop/humanloop.client.js:19:15)
workbench-1  |     at Hook._require.Module.require (/usr/src/app/node_modules/@newrelic/ritm/index.js:188:39)
workbench-1  |     at Object.<anonymous> (/usr/src/app/node_modules/humanloop/index.js:28:26)
workbench-1  |     at Hook._require.Module.require (/usr/src/app/node_modules/@newrelic/ritm/index.js:188:39)
workbench-1  |     at Object.<anonymous> (/usr/src/app/dist/src/workbench/workbench.service.js:27:21)
workbench-1  |     at Hook._require.Module.require (/usr/src/app/node_modules/@newrelic/ritm/index.js:188:39)
workbench-1  |     at Object.<anonymous> (/usr/src/app/dist/src/workbench/workbench.controller.js:17:29)
workbench-1  |     at Hook._require.Module.require (/usr/src/app/node_modules/@newrelic/ritm/index.js:188:39)
workbench-1  |     at Object.<anonymous> (/usr/src/app/dist/src/workbench/workbench.module.js:13:32)
workbench-1  |     at Hook._require.Module.require (/usr/src/app/node_modules/@newrelic/ritm/index.js:188:39)
workbench-1  |     at Object.<anonymous> (/usr/src/app/dist/src/app.module.js:18:28)
workbench-1  |     at Hook._require.Module.require (/usr/src/app/node_modules/@newrelic/ritm/index.js:188:39)
workbench-1  |     at Object.<anonymous> (/usr/src/app/dist/src/main.js:48:22) {
workbench-1  |   code: 'ERR_REQUIRE_ESM'
workbench-1  | }
workbench-1  | 
workbench-1  | Node.js v18.17.1
```

* Expected:
```
workbench-1  | Debugger listening on ws://127.0.0.1:9229/47b608d3-ec4f-49b6-9e81-c0084514d796
workbench-1  | For help, see: https://nodejs.org/en/docs/inspector
workbench-1  | [NestWinston] 166 2/19/2025, 12:15:53 AM     LOG [NestFactory] Starting Nest application...
workbench-1  | [NestWinston] 166 2/19/2025, 12:15:53 AM     LOG [InstanceLoader] AppModule dependencies initialized
workbench-1  | [NestWinston] 166 2/19/2025, 12:15:53 AM     LOG [RoutesResolver] AppController {/workbench}:
workbench-1  | [NestWinston] 166 2/19/2025, 12:15:53 AM     LOG [RouterExplorer] Mapped {/workbench/healthcheck, GET} route
workbench-1  | [NestWinston] 166 2/19/2025, 12:15:53 AM     LOG [RouterExplorer] Mapped {/workbench/api.json, GET} route
workbench-1  | [NestWinston] 166 2/19/2025, 12:15:53 AM     LOG [NestApplication] Nest application successfully started
```


