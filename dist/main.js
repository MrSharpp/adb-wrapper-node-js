var $iEn1Z$child_process = require("child_process"),
  $iEn1Z$os = require("os"),
  $iEn1Z$fs = require("fs"),
  $iEn1Z$process = require("process");
function $parcel$defineInteropFlag(e) {
  Object.defineProperty(e, "__esModule", { value: !0, configurable: !0 });
}
function $parcel$export(e, a, $, r) {
  Object.defineProperty(e, a, {
    get: $,
    set: r,
    enumerable: !0,
    configurable: !0,
  });
}
function $parcel$interopDefault(e) {
  return e && e.__esModule ? e.default : e;
}
$parcel$defineInteropFlag(module.exports),
  $parcel$export(
    module.exports,
    "default",
    () => $f5bfd4ce37214f4f$export$2e2bcd8739ae039
  );
const $c122116bdd400350$export$684c1904296af82 = ["install"],
  $c122116bdd400350$export$77048b86c4e268b = new RegExp(
    "^[a-z]:((\\\\|/)[a-zA-Z0-9_ -]+)+.apk$",
    "i"
  );
let $8e21a199ffaaeeb1$var$currentDevice = "",
  $8e21a199ffaaeeb1$var$explicitAdbPath = "";
const $8e21a199ffaaeeb1$var$execCmd = (t, c) =>
    new Promise((a, $) => {
      let e;
      t
        ? (e = c
            ? ["shell"]
            : t
                .split(/\s{1,}/g)
                .join(" ")
                .split(" "))
        : $(
            new Error(
              "Invalid command data type, please provide string or array"
            )
          ),
        $c122116bdd400350$export$684c1904296af82.includes(e[0]) &&
        "" == $8e21a199ffaaeeb1$var$currentDevice
          ? $(
              new Error(
                "Please call setCurrentActiveDevice, to set the current active device"
              )
            )
          : $c122116bdd400350$export$684c1904296af82.includes(e[0]) &&
            (e = ["-s", $8e21a199ffaaeeb1$var$currentDevice, ...e]);
      const r = (0, $iEn1Z$child_process.spawn)("adb", e, {
        shell: !0,
        env: {
          ...$iEn1Z$process.env,
          PATH: `undefined;${$8e21a199ffaaeeb1$var$explicitAdbPath};`,
        },
      });
      c && (r.stdin.write(t), r.stdin.end()),
        r.stdout.on("data", (e) => a(e.toString())),
        r.stderr.on("data", (e) => $(new Error(e.toString()))),
        r.on("error", (e) => $(new Error(e.toString())));
    }),
  $8e21a199ffaaeeb1$var$execShellCmd = (e) =>
    "string" != typeof e
      ? Promise.reject(
          new Error("Invalid shell commands, please provide a string")
        )
      : $8e21a199ffaaeeb1$var$execCmd(e, !0),
  $8e21a199ffaaeeb1$var$isAdbInstalled = () =>
    new Promise((a, e) => {
      $8e21a199ffaaeeb1$var$execCmd("--help")
        .then(() => a(!0))
        .catch((e) => a(!1));
    }),
  $8e21a199ffaaeeb1$var$deviceList = () =>
    new Promise(($, a) => {
      $8e21a199ffaaeeb1$var$execCmd("devices")
        .then((e) => {
          let a = e.split($iEn1Z$os.EOL);
          a.shift();
          e = (a = a.filter((e) => "" != e)).map((e) => {
            const a = e.split(/\s+/);
            e = /\W+/.test(a[0]);
            return {
              type: e ? "virtual" : "physical",
              udid: a[0],
              port: e ? a[0].match(/\W\d{4}/)[0].slice(1, 5) : null,
            };
          });
          $(e);
        })
        .catch((e) => {
          console.log(e), a([]);
        });
    }),
  $8e21a199ffaaeeb1$var$setCurrentActiveDevice = (e) => {
    $8e21a199ffaaeeb1$var$currentDevice = e;
  },
  $8e21a199ffaaeeb1$var$setAdbExplicitPath = (e) => {
    $8e21a199ffaaeeb1$var$explicitAdbPath = e;
  },
  $8e21a199ffaaeeb1$var$killServer = () =>
    $8e21a199ffaaeeb1$var$execCmd("kill-server"),
  $8e21a199ffaaeeb1$var$startServer = () =>
    $8e21a199ffaaeeb1$var$execCmd("start-server"),
  $8e21a199ffaaeeb1$var$reconnect = () =>
    $8e21a199ffaaeeb1$var$execCmd("reconnect"),
  $8e21a199ffaaeeb1$var$tcpip = (e) =>
    $8e21a199ffaaeeb1$var$execCmd("tcpip " + e),
  $8e21a199ffaaeeb1$var$connectRemote = (e) =>
    $8e21a199ffaaeeb1$var$execCmd(`connect ${e.ip}:` + e.port),
  $8e21a199ffaaeeb1$var$disconnectRemote = (e) =>
    $8e21a199ffaaeeb1$var$execCmd(`disconnect ${e.ip}:` + e.port),
  $8e21a199ffaaeeb1$var$installApp = (e) =>
    $c122116bdd400350$export$77048b86c4e268b.test(e) &&
    $parcel$interopDefault($iEn1Z$fs).existsSync(e)
      ? $8e21a199ffaaeeb1$var$execCmd("install -r " + e)
      : Promise.reject(new Error("Invalid Apk Path")),
  $8e21a199ffaaeeb1$var$uninstallApp = (e) =>
    e
      ? $8e21a199ffaaeeb1$var$execCmd("uninstall " + e)
      : Promise.reject(new Error("Invalid Apk package id")),
  $8e21a199ffaaeeb1$var$getCurrentOpendedActivity = () =>
    $8e21a199ffaaeeb1$var$execShellCmd(
      "dumpsys activity activities | grep mResumedActivity"
    ),
  $8e21a199ffaaeeb1$var$adb = {
    isAdbInstalled: $8e21a199ffaaeeb1$var$isAdbInstalled,
    reconnect: $8e21a199ffaaeeb1$var$reconnect,
    startServer: $8e21a199ffaaeeb1$var$startServer,
    killServer: $8e21a199ffaaeeb1$var$killServer,
    tcpip: $8e21a199ffaaeeb1$var$tcpip,
    connectRemote: $8e21a199ffaaeeb1$var$connectRemote,
    disconnectRemote: $8e21a199ffaaeeb1$var$disconnectRemote,
    setAdbExplicitPath: $8e21a199ffaaeeb1$var$setAdbExplicitPath,
    setCurrentActiveDevice: $8e21a199ffaaeeb1$var$setCurrentActiveDevice,
    deviceList: $8e21a199ffaaeeb1$var$deviceList,
    installApp: $8e21a199ffaaeeb1$var$installApp,
    uninstallApp: $8e21a199ffaaeeb1$var$uninstallApp,
    execShellCmd: $8e21a199ffaaeeb1$var$execShellCmd,
    getCurrentOpendedActivity: $8e21a199ffaaeeb1$var$getCurrentOpendedActivity,
  };
var $8e21a199ffaaeeb1$export$2e2bcd8739ae039 = $8e21a199ffaaeeb1$var$adb,
  $f5bfd4ce37214f4f$export$2e2bcd8739ae039 = $8e21a199ffaaeeb1$var$adb;
