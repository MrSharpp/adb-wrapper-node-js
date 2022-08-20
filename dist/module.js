import { spawn as $hgUW1$spawn } from "child_process";
import { EOL as $hgUW1$EOL } from "os";
import { env as $hgUW1$env } from "process";

const $234747a9630b4642$export$684c1904296af82 = [];

("use strict");

const $7853f84bdf9ea355$var$currentDevice = "";
/** External adb path */ let $7853f84bdf9ea355$var$explicitAdbPath = "";
const $7853f84bdf9ea355$var$execCmd = (cmd) => {
  return new Promise((resolve, reject) => {
    !cmd
      ? reject(new Error("No CMD"))
      : (cmd = cmd
          .split(/\s{1,}/g)
          .join(" ")
          .split(" "));
    if (
      (0, $234747a9630b4642$export$684c1904296af82).includes(cmd[0]) &&
      $7853f84bdf9ea355$var$currentDevice == ""
    )
      return console.error(
        "this command requires device id to be set, please use setCurrentDevice function."
      );
    $7853f84bdf9ea355$var$currentDevice == "" ||
      cmd.push(`-s ${$7853f84bdf9ea355$var$currentDevice}`);
    console.log($7853f84bdf9ea355$var$explicitAdbPath);
    const cp = (0, $hgUW1$spawn)("adb", cmd, {
      env: {
        ...$hgUW1$env,
        PATH: `${undefined};${$7853f84bdf9ea355$var$explicitAdbPath};`,
      },
    });
    cp.stdout.on("data", (data) => resolve(data.toString()));
    cp.stderr.on("data", (data) => reject(new Error(data.toString())));
    cp.on("error", (data) => reject(new Error(data.toString())));
  });
};
const $7853f84bdf9ea355$var$isAdbInstalled = () => {
  return new Promise((resolve, reject) => {
    $7853f84bdf9ea355$var$execCmd("--help")
      .then(() => resolve(true))
      .catch((err) => resolve(false));
  });
};
const $7853f84bdf9ea355$var$deviceList = () => {
  return new Promise((resolve, reject) => {
    $7853f84bdf9ea355$var$execCmd("devices")
      .then((dataString) => {
        let devices = dataString.split((0, $hgUW1$EOL));
        devices.shift();
        devices = devices.filter((l) => l != "");
        const devicesObj = devices.map((device) => {
          const tempDevice = device.split(/\s+/);
          const isVirtual = /\W+/.test(tempDevice[0]);
          return {
            type: isVirtual ? "virtual" : "physical",
            udid: tempDevice[0],
            port: isVirtual
              ? tempDevice[0].match(/\W\d{4}/)[0].slice(1, 5)
              : null,
          };
        });
        console.log(devicesObj);
        resolve(devicesObj);
      })
      .catch((err) => {
        console.log(err);
        reject([]);
      });
  });
};
/**
 * @param {string} device udid of the device
 */ const $7853f84bdf9ea355$var$setCurrentActiveDevice = (device) => {
  $7853f84bdf9ea355$var$explicitAdbPath = device;
};
const $7853f84bdf9ea355$var$setAdbExplicitPath = (path) => {
  $7853f84bdf9ea355$var$explicitAdbPath = path;
};
const $7853f84bdf9ea355$var$killServer = () =>
  $7853f84bdf9ea355$var$execCmd("kill-server");
const $7853f84bdf9ea355$var$startServer = () =>
  $7853f84bdf9ea355$var$execCmd("start-server");
const $7853f84bdf9ea355$var$reconnect = () =>
  $7853f84bdf9ea355$var$execCmd("reconnect");
const $7853f84bdf9ea355$var$adb = {
  isAdbInstalled: $7853f84bdf9ea355$var$isAdbInstalled,
  reconnect: $7853f84bdf9ea355$var$reconnect,
  startServer: $7853f84bdf9ea355$var$startServer,
  killServer: $7853f84bdf9ea355$var$killServer,
  setAdbExplicitPath: $7853f84bdf9ea355$var$setAdbExplicitPath,
  setCurrentActiveDevice: $7853f84bdf9ea355$var$setCurrentActiveDevice,
  deviceList: $7853f84bdf9ea355$var$deviceList,
};
var $7853f84bdf9ea355$export$2e2bcd8739ae039 = $7853f84bdf9ea355$var$adb;

var $149c1bd638913645$export$2e2bcd8739ae039 =
  (0, $7853f84bdf9ea355$export$2e2bcd8739ae039);

export { $149c1bd638913645$export$2e2bcd8739ae039 as default };
//# sourceMappingURL=module.js.map
