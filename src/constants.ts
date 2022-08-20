const cmdRequiredDevices = ["install"];

const filePathRegex = new RegExp("^[a-z]:((\\\\|/)[a-zA-Z0-9_ -]+)+.apk$", "i");

export { cmdRequiredDevices, filePathRegex };
