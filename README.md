<a name="readme-top"></a>

<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->

<!-- PROJECT LOGO -->
<div align="center">
  <!-- <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

  <h3 align="center">Adb-Wrapper</h3>

  <p align="center">
    An awesome ADB wrapper made in node js to use adb just with functions.
    <!-- <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a> -->
    <br />
    <!-- <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a> -->
    ·
    <a href="https://github.com/MrSharpp/adb-wrapper-node-js/issues">Report Bug</a>
    ·
    <a href="https://github.com/MrSharpp/adb-wrapper-node-js/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#methods">Methods</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <!-- <li><a href="#roadmap">Roadmap</a></li> -->
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <!-- <li><a href="#acknowledgments">Acknowledgments</a></li> -->
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

The adb wrapper provides a flexibal API to execute adb commands. <br> A user can also pass the custom the adb path to it.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

If you dont have ADB installed in your system, dont worry. It has inbuilt adb, you could also provide a path for adb explicity, which the module will use.

### Prerequisites

Node js and an initialized npm folder

- npm
  ```sh
  npm install adb-wrapper
  ```

<!-- ROADMAP -->
<!-- ## Roadmap

- [x] Add Changelog
- [x] Add back to top links
- [ ] Add Additional Templates w/ Examples
- [ ] Add "components" document to easily copy & paste sections of the readme
- [ ] Multi-language Support
    - [ ] Chinese
    - [ ] Spanish -->

See the [open issues](https://github.com/MrSharpp/adb-wrapper-node-js/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

After installation of the module into your project, you can take this simple example.

```javascript
import ADB from "adb-wrapper";

async function main() {
  var getAdbInstalled = await ADB.isAdbInstalled();

  if (!getAdbInstalled) return console.log("Adb is not installed");

  var deviceList = await ADB.deviceList();

  console.log(`Connected Devices ${JSON.stringify(deviceList)}`);
}

main();
```

There will be more functions in upcoming days as we are actively developing it. Watch it to get notified whenever we add something new to it. 😉

<p align="right">(<a href="#readme-top">back to top</a>)</p>


# Methods
Here are the list of methods you can use.
* ``` deviceList() ``` <br>
<b>Returns: {  type: string,
  udid: string,
  port: string}</b>
Returns Object of all detected devices by adb.

* ``` setCurrentActiveDevice() ``` <br>
<b>Prams: device (device udid)</b> <br>
set the current active device 
* ``` isAdbInstalled() ``` <br>
<b>Returns: boolean</b> <br>
detect if adb is installed or not
* ``` setAdbExplicitPath() ``` <br>
<b>Params: path (folder path of the adb)</b> <br>
if the adb is not installed, you can manually download it and provide the path of the folder where adb.exe exsists
* ``` killServer() ``` <br>
kill the adb server
* ``` startServer() ``` <br>
start the adb server
* ``` tcpip() ``` <br>
<b>Prams: port (port on which to start the adb server listening to)</b> <br>
adb listen to a port
* ``` connectRemote() ``` <br>
<b>Params: {ip( of the remote host), port (of remort host)} (folder path of the adb)</b> <br>
connect to a device on a remote host
* ``` disconnectRemote() ``` <br>
<b>Params: {ip( of the remote host), port (of remort host)} (folder path of the adb)</b> <br>
disconnect to a device on a remote host
  <h3 style="color:red">Please set the current active device to which the command will executed, some function wont work. Do it by  calling setCurrentActiveDevice() and providing the udid of the device.
  
  
  <br>
  You can get the devices udid by calling the function deviceList()
  </h3>
* ``` installApp() ``` <br>
<b>Params: apkPath (path of the apk)</b> <br>
Install the app to the current active android device
* ``` uninstallApp() ``` <br>
<b>Params: packageId (the package id of the app to uninstall)</b> <br>
uninstall the app given by the package id
* ``` execShellCmd() ``` <br>
<b>Params: shellCmd (shell command) note: dont include `shell` in it</b> <br>
its equivalent to adb shell. you can execute the shell commands using it
* ``` getCurrentOpendedActivity() ``` <br>
<b>Returns: packageInfo (of the current Activity Openned)</b> <br>
it will return the info of the current openned activity, including the package id of the app.


<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Author Name - [@amir-alam-44378416b](https://www.linkedin.com/in/amir-alam-44378416b) - sharpprogrammer2018@gmail.com

Project Link: [https://github.com/MrSharpp/adb-wrapper-node-js](https://github.com/MrSharpp/adb-wrapper-node-js)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
<!-- ## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
* [Malven's Grid Cheatsheet](https://grid.malven.co/)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/MrSharpp/adb-wrapper-node-js/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/MrSharpp/adb-wrapper-node-js/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/MrSharpp/adb-wrapper-node-js/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/MrSharpp/adb-wrapper-node-js/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/MrSharpp/adb-wrapper-node-js/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/amir-alam-44378416b/
