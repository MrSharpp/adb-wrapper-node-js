'use strict';

const { spawn } = require('child_process');
const EOL = require('os').EOL;
const { cmdRequiredDevices } = require('./constants');

let currentDevice = '';
/** @type {string} external adb path */
let explicitAdbPath = '';

/**

 * @param {string} cmd 
 * @returns {void}
 */
const execCmd = (cmd) => {
    return new Promise((resolve, reject) => {
        !cmd ? reject(new Error("No CMD")) : cmd = cmd.split(/\s{1,}/g).join(" ").split(" ")
        if(cmdRequiredDevices.includes(cmd[0]) && currentDevice == ''){
           return console.error("this command requires device id to be set, please use setCurrentDevice function.")
        }
        currentDevice == '' ? '' : cmd.push(`-s ${currentDevice}`)
        
        console.log(explicitAdbPath)

        const cp = spawn("adb", cmd, {  env: {
            ...process.env,
            PATH: `${process.env.PATH};${explicitAdbPath};`,
          }})

        cp.stdout.on('data', (data) => resolve(data.toString()))
        cp.stderr.on('data', (data) => reject(new Error(data.toString())))
        cp.on('error', (data) => reject(new Error(data.toString())))
    })
}

/**
 * 
 * @returns {boolean}
 */
const isAdbInstalled = () => {
    return new Promise(async (resolve, reject) => {
        execCmd("--help").then(() => resolve(true)).catch((err) => resolve(false))
    })
}

/**
 * 
 * @returns {Object.type} virtual or physical
 * @returns {Object.udid}
 * @returns {Object.port}
 * 
 */
 const deviceList = () => {
    return new Promise(async (resolve, reject) => {
        execCmd("devices").then((dataString) => {
            let devices = dataString.split(EOL)
            devices.shift()
            devices = devices.filter((l) => l != '' )
            devices =  devices.map((device) => {
                device = device.split(/\s+/);
                var isVirtual = /\W+/.test(device[0]);
                
                return {
                    type: isVirtual ? 'virtual' : 'physical',
                    udid: device[0],
                    port: isVirtual ? device[0].match(/\W\d{4}/)[0].slice(1, 5) : null
                  };
            })
            console.log(devices)
        }).catch((err) => {
            console.log(err)
            reject([])
        })
    })
}

/**
 * 
 * @param {string} device udid of the device
 * @returns {void}
 */
const setCurrentActiveDevice = (device) => explicitAdbPath = device
const setAdbExplicitPath = (path) => explicitAdbPath = path;
const killServer = () => execCmd("kill-server")
const startServer = () => execCmd("start-server")
const reconnect = () => execCmd("reconnect")

module.exports = {
    isAdbInstalled,
    reconnect,
    startServer,
    killServer,
    setAdbExplicitPath,
    setCurrentActiveDevice,
    deviceList
}