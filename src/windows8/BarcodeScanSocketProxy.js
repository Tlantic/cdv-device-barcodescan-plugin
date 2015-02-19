    /* global console, exports, require */
    'use strict';

    var BarcodeScan = require('com.tlantic.plugins.device.barcodescan.BarcodeScan');

    var barcodeScan;

    exports.init = function (success, fail, args){

      barcodeScan = new BarcodeScan();
      barcodeScan.onReceive = exports.rcMessage;
      barcodeScan.init(success, fail);

    }

    exports.stop = function stop(success, fail, args){
      barcodeScan.stop(success);
    }

    // callback to receive data written on socket inputStream
    exports.rcMessage = function (scanLabel, scanData, scanType) {
        window.tlantic.plugins.device.barcodescan.receive(scanLabel, scanData, scanType);
    };

    require('cordova/windows8/commandProxy').add('DeviceBarcodeScan', exports);
