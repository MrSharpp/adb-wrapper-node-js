type DeviceListType = {
  type: string;
  udid: string;
  port: string;
}[];
type Remote = {
  ip: string;
  port: number;
};
declare const adb: {
  isAdbInstalled: () => Promise<boolean>;
  reconnect: () => Promise<string>;
  startServer: () => Promise<string>;
  killServer: () => Promise<string>;
  tcpip: (port: number) => Promise<string>;
  connectRemote: (device: Remote) => Promise<string>;
  disconnectRemote: (device: Remote) => Promise<string>;
  setAdbExplicitPath: (path: string) => void;
  setCurrentActiveDevice: (device: string) => void;
  deviceList: () => Promise<DeviceListType>;
  installApp: (apkPath: string) => Promise<string>;
  uninstallApp: (packageId: string) => Promise<string>;
  execShellCmd: (cmd: string | string[]) => Promise<string>;
  getCurrentOpendedActivity: () => Promise<string>;
};
export default adb;
