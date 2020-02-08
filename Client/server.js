import { spawn } from "child_process";
const options = {
    stdio: "inherit",
    shell: true
};
const port = process.env.port || "4200";
const angularCli = spawn("ng", ["serve", "--port " + port, "--open"], options);
angularCli.on("exit", (code, _) => {
    process.exit(code);
});
//# sourceMappingURL=server.js.map