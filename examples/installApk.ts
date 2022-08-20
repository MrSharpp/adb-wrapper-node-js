import adb from "../src/adb";

async function main() {
  adb.setCurrentActiveDevice((await adb.deviceList())[0].udid);
  // console.log(await adb.uninstallApp("io.testproject.demo"))
  // console.log(await adb.installApp("C:\\Users\\user\\Downloads\\testproject-demo-app.apk"))
}

main();
