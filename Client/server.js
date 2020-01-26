import { spawn } from "child_process";
import { join, resolve } from 'path';
import { writeFileSync, readFileSync } from 'fs';
const currentDir = process.cwd();
const apiSettingsPath = resolve(currentDir, "../Funcs/Properties/launchSettings.json");
const apiSettingsContent = readFileSync(apiSettingsPath, { encoding: "utf8" }).replace(/^\uFEFF/, '');
const apiSettings = JSON.parse(apiSettingsContent);
let apiPort = "7071";
if (apiSettings && apiSettings.profiles && apiSettings.profiles["nHail.YAPP.Funcs"] && apiSettings.profiles["nHail.YAPP.Funcs"].commandLineArgs) {
    const commandLineArgs = apiSettings.profiles["nHail.YAPP.Funcs"].commandLineArgs;
    const apiSettingsPort = commandLineArgs.split("--").filter(function (x) {
        return x.startsWith("port ");
    })
        .reduce(function (acc, item) {
        let detail = item.split(" ");
        if (detail.length == 2) {
            return detail[1];
        }
        return acc;
    }, "");
    if (apiSettingsPort) {
        apiPort = apiSettingsPort;
    }
}
const apiUrl = "http://localhost:" + apiPort + "/api";
const tempProxySettingFile = join(currentDir, "WebApiProxy.json");
const proxyData = {
    "/api": {
        "target": apiUrl,
        "secure": false
    }
};
writeFileSync(tempProxySettingFile, JSON.stringify(proxyData));
const options = {
    stdio: "inherit",
    shell: true
};
const port = process.env.port || "4200";
const angularCli = spawn("ng", ["serve", "--port " + port, "--proxy-config " + tempProxySettingFile, "--open"], options);
angularCli.on("exit", (code, _) => {
    process.exit(code);
});
//# sourceMappingURL=server.js.map