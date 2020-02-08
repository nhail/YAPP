// THIS IS TO BOOTSTRAP LOADING AngularCLI from NodeJS.
//  !!!! NOT FOR PRODUCTION USE !!!!
import { spawn, SpawnOptions } from "child_process";
//import { join, resolve } from 'path';
//import { writeFileSync, readFileSync } from 'fs';

////Read Azure Funcs settings file to create proxy setting file for AngularCLI
//const currentDir = process.cwd();
//const apiSettingsPath = resolve(currentDir, "../Funcs/Properties/launchSettings.json");
//const apiSettingsContent = readFileSync(apiSettingsPath, { encoding: "utf8" }).replace(/^\uFEFF/, '');
//const apiSettings = JSON.parse(apiSettingsContent);
//let apiPort = "7071";
//if (apiSettings && apiSettings.profiles && apiSettings.profiles["nHail.YAPP.Funcs"] && apiSettings.profiles["nHail.YAPP.Funcs"].commandLineArgs) {
//  const commandLineArgs: string = apiSettings.profiles["nHail.YAPP.Funcs"].commandLineArgs;
//  const apiSettingsPort = commandLineArgs.split("--").filter(function (x) {
//            return x.startsWith("port ");
//        })
//        .reduce(function (acc, item) {
//            let detail = item.split(" ");
//            if (detail.length == 2) {
//                return detail[1];
//            }
//            return acc;
//        }, "");
//    if (apiSettingsPort) {
//        apiPort = apiSettingsPort;
//    }
//}

//const apiUrl = "http://localhost:" + apiPort + "/api";
//const tempProxySettingFile = join(currentDir, "WebApiProxy.json");
//const proxyData = {
//    "/api": {
//        "target": apiUrl,
//        "secure": false
//    }
//};

//writeFileSync(tempProxySettingFile, JSON.stringify(proxyData));


// launch Angular Cli as a NodeJs Process
const options: SpawnOptions = {
    stdio: "inherit",
    shell: true
}
const port = process.env.port || "4200";
const angularCli = spawn("ng", ["serve", "--port " + port, "--open"], options);
angularCli.on("exit", (code, _) => {
    process.exit(code);
});

