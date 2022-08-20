type DeviceListType = {
  type: string;
  udid: string;
  port: string;
}[];
declare const adb: {
  isAdbInstalled: () => Promise<boolean>;
  reconnect: () => Promise<string>;
  startServer: () => Promise<string>;
  killServer: () => Promise<string>;
  setAdbExplicitPath: (path: string) => void;
  setCurrentActiveDevice: (device: string) => void;
  deviceList: () => Promise<DeviceListType>;
  installApp: (apkPath: string) => Promise<string>;
  uninstallApp: (packageId: string) => Promise<string>;
};
export default adb;
