cdv-device-barcodescan-plugin
=================

Cordova Native BarcodeScan Plugin


## Cordova/Phonegap Support ##

This plugin was tested and qualified using Cordova 3.4 adn Cordova 3.5. The demo app contains implementation for  Windows 8.

Only works on windos 8.1 sdk version

## Using the plugin ##

The plugin creates a "DeviceBarcodeScan" object exposed on window.tlantic.plugins.device.barcodescan. The following methods can be accessed:

* init: starts listening native barcode event. Return _scanner object;
* stop: stop listening native barcode event;
* receive: callback used by plugin's native code. Can be override by a custom implementation.


### init (successCallback, errorCallback)

Example:

```
winwindow.tlantic.plugins.device.barcodescan.init(
  function (scanner) {
    console.log(scanner);  
  },

  function (error) {
    console.log(error);
  }
);
```

### stop (successCallback, errorCallback)

Disconnects any connection opened for a given connection.

Example:

```
window.tlantic.plugins.device.barcodescan.stop(
  function () {
    console.log('stop listening');  
  },

  function () {
    console.log('error on stop event listening');
  }
);
```


### receive (scanLabel, scanData, scanType)

This method is a callback invoked by native code through webview capabilities. You can replace this method by your own implementation. Even this way, the default implementation dispatches a JS event which can be catched listening that event. Here it goes a proper implementation regarding default method behavior:

```
document.addEventListener(window.tlantic.plugins.device.barcodescan.receiveHookName, function (data) {
  console.log(data.scanLabel);
  console.log(data.scanData);
  console.log(data.scanType);
});
```

## License terms

    Cordova Device BarcodeSecan Plugin
    Copyright (C) 2015  Tlantic SI

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>
