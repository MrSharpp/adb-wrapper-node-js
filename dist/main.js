var $8zHUo$child_process = require("child_process");
var $8zHUo$os = require("os");
var $8zHUo$process = require("process");

function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, "__esModule", { value: true, configurable: true });
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {
    get: v,
    set: s,
    enumerable: true,
    configurable: true,
  });
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(
  module.exports,
  "default",
  () => $882b6d93070905b3$export$2e2bcd8739ae039
);

const $af8d31735c159a26$export$684c1904296af82 = [];

("use strict");

const $a248aa7a1e959fbf$var$currentDevice = "";
/** External adb path */ let $a248aa7a1e959fbf$var$explicitAdbPath = "";
const $a248aa7a1e959fbf$var$execCmd = (cmd) => {
  return new Promise((resolve, reject) => {
    !cmd
      ? reject(new Error("No CMD"))
      : (cmd = cmd
          .split(/\s{1,}/g)
          .join(" ")
          .split(" "));
    if (
      (0, $af8d31735c159a26$export$684c1904296af82).includes(cmd[0]) &&
      $a248aa7a1e959fbf$var$currentDevice == ""
    )
      return console.error(
        "this command requires device id to be set, please use setCurrentDevice function."
      );
    $a248aa7a1e959fbf$var$currentDevice == "" ||
      cmd.push(`-s ${$a248aa7a1e959fbf$var$currentDevice}`);
    console.log($a248aa7a1e959fbf$var$explicitAdbPath);
    const cp = (0, $8zHUo$child_process.spawn)("adb", cmd, {
      env: {
        ...$8zHUo$process.env,
        PATH: `${undefined};${$a248aa7a1e959fbf$var$explicitAdbPath};`,
      },
    });
    cp.stdout.on("data", (data) => resolve(data.toString()));
    cp.stderr.on("data", (data) => reject(new Error(data.toString())));
    cp.on("error", (data) => reject(new Error(data.toString())));
  });
};
const $a248aa7a1e959fbf$var$isAdbInstalled = () => {
  return new Promise((resolve, reject) => {
    $a248aa7a1e959fbf$var$execCmd("--help")
      .then(() => resolve(true))
      .catch((err) => resolve(false));
  });
};
const $a248aa7a1e959fbf$var$deviceList = () => {
  return new Promise((resolve, reject) => {
    $a248aa7a1e959fbf$var$execCmd("devices")
      .then((dataString) => {
        let devices = dataString.split((0, $8zHUo$os.EOL));
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
 */ const $a248aa7a1e959fbf$var$setCurrentActiveDevice = (device) => {
  $a248aa7a1e959fbf$var$explicitAdbPath = device;
};
const $a248aa7a1e959fbf$var$setAdbExplicitPath = (path) => {
  $a248aa7a1e959fbf$var$explicitAdbPath = path;
};
const $a248aa7a1e959fbf$var$killServer = () =>
  $a248aa7a1e959fbf$var$execCmd("kill-server");
const $a248aa7a1e959fbf$var$startServer = () =>
  $a248aa7a1e959fbf$var$execCmd("start-server");
const $a248aa7a1e959fbf$var$reconnect = () =>
  $a248aa7a1e959fbf$var$execCmd("reconnect");
const $a248aa7a1e959fbf$var$adb = {
  isAdbInstalled: $a248aa7a1e959fbf$var$isAdbInstalled,
  reconnect: $a248aa7a1e959fbf$var$reconnect,
  startServer: $a248aa7a1e959fbf$var$startServer,
  killServer: $a248aa7a1e959fbf$var$killServer,
  setAdbExplicitPath: $a248aa7a1e959fbf$var$setAdbExplicitPath,
  setCurrentActiveDevice: $a248aa7a1e959fbf$var$setCurrentActiveDevice,
  deviceList: $a248aa7a1e959fbf$var$deviceList,
};
var $a248aa7a1e959fbf$export$2e2bcd8739ae039 = $a248aa7a1e959fbf$var$adb;

var $882b6d93070905b3$export$2e2bcd8739ae039 =
  (0, $a248aa7a1e959fbf$export$2e2bcd8739ae039);

//# sourceMappingURL=main.js.map
