"use strict";

import { spawn } from "child_process";
import { EOL } from "os";
import { cmdRequiredDevices, filePathRegex } from "./constants";
import fs from "fs";

let currentDevice = "";

/** External adb path */
let explicitAdbPath = "";

const execCmd = (cmd: string | string[]): Promise<string> => {
  return new Promise((resolve, reject) => {
    !cmd
      ? reject(new Error("No CMD"))
      : (cmd = (cmd as string)
          .split(/\s{1,}/g)
          .join(" ")
          .split(" "));

    if (cmdRequiredDevices.includes(cmd[0]) && currentDevice == "")
      reject(
        new Error(
          "Please call setCurrentActiveDevice, to set the current active device"
        )
      );
    else if (cmdRequiredDevices.includes(cmd[0]))
      cmd = [`-s`, currentDevice, ...(cmd as string[])];

    // console.log(cmd);
    const cp = spawn("adb", cmd as string[], {
      env: { ...process.env, PATH: `${process.env.PATH};${explicitAdbPath};` },
    });
    cp.stdout.on("data", (data) => resolve(data.toString()));
    cp.stderr.on("data", (data) => reject(new Error(data.toString())));
    cp.on("error", (data) => reject(new Error(data.toString())));
  });
};

const isAdbInstalled = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    execCmd("--help")
      .then(() => resolve(true))
      .catch((err) => resolve(false));
  });
};

type DeviceListType = {
  type: string;
  udid: string;
  port: string;
}[];

const deviceList = (): Promise<DeviceListType> => {
  return new Promise((resolve, reject) => {
    execCmd("devices")
      .then((dataString: string) => {
        let devices: string | string[] = dataString.split(EOL);
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
 */
const setCurrentActiveDevice = (device: string) => {
  currentDevice = device;
};

const setAdbExplicitPath = (path: string) => {
  explicitAdbPath = path;
};

type Remote = {
  ip: string;
  port: number;
};

const killServer = () => execCmd("kill-server");
const startServer = () => execCmd("start-server");
const reconnect = () => execCmd("reconnect");
const tcpip = (port: number) => execCmd(`tcpip ${port}`);
const connectRemote = (device: Remote) =>
  execCmd(`connect ${device.ip}:${device.port}`);
const disconnectRemote = (device: Remote) =>
  execCmd(`disconnect ${device.ip}:${device.port}`);
const installApp = (apkPath: string) =>
  filePathRegex.test(apkPath) && fs.existsSync(apkPath)
    ? execCmd(`install -r ${apkPath}`)
    : Promise.reject(new Error("Invalid Apk Path"));
const uninstallApp = (packageId: string) =>
  !packageId
    ? Promise.reject(new Error("Invalid Apk package id"))
    : execCmd(`uninstall ${packageId}`);

const adb = {
  isAdbInstalled,
  reconnect,
  startServer,
  killServer,
  setAdbExplicitPath,
  setCurrentActiveDevice,
  deviceList,
  installApp,
  uninstallApp,
};

export default adb;
