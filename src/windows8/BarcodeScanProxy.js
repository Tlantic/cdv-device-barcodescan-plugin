cordova.define("com.tlantic.plugins.device.barcodescan.BarcodeScanProxy", function(require, exports, module) {     /* global console, exports, require */
    'use strict';

    var BarcodeScan = require('com.tlantic.plugins.device.barcodescan.BarcodeScan');

    var barcodeScan;

    exports.init = function (success, fail, args){

        if (!barcodeScan) {
            barcodeScan = new BarcodeScan();
            barcodeScan.onReceive = exports.rcMessage;
            barcodeScan.init(success, fail);
        }
        else {
            barcodeScan.endReceivingData(function () {
                barcodeScan.onReceive = exports.rcMessage;
                barcodeScan.init(success, fail);
            });
        }


    };

    exports.stop = function stop(success, fail, args){
        barcodeScan.endReceivingData(success);
    };

    // callback to receive data written on socket inputStream
    exports.rcMessage = function (scanLabel, scanData, scanType) {
        window.tlantic.plugins.device.barcodescan.receive(scanLabel, scanData, scanType);
    };

    require('cordova/windows8/commandProxy').add('DeviceBarcodeScan', exports);

});
