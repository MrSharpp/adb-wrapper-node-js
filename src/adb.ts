"use strict";

import { spawn } from "child_process";
import { EOL } from "os";
import { cmdRequiredDevices } from "./constants";

const currentDevice = "";

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

    if (cmdRequiredDevices.includes(cmd[0]) && currentDevice == "") {
      return console.error(
        "this command requires device id to be set, please use setCurrentDevice function."
      );
    }
    currentDevice == "" ? "" : (cmd as string[]).push(`-s ${currentDevice}`);

    console.log(explicitAdbPath);

    const cp = spawn("adb", cmd as string[], {
      env: {
        ...process.env,
        PATH: `${process.env.PATH};${explicitAdbPath};`,
      },
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
 */
const setCurrentActiveDevice = (device: string) => {
  explicitAdbPath = device;
};

const setAdbExplicitPath = (path: string) => {
  explicitAdbPath = path;
};

const killServer = () => execCmd("kill-server");

const startServer = () => execCmd("start-server");

const reconnect = () => execCmd("reconnect");

const adb = {
  isAdbInstalled,
  reconnect,
  startServer,
  killServer,
  setAdbExplicitPath,
  setCurrentActiveDevice,
  deviceList,
};

export default adb;
