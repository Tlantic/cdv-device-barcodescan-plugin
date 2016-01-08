/* global module, require, document */
var exec = require('cordova/exec');

//
function DeviceBarcodeScan() {
    'use strict';

    this.receiveHookName = 'DEVICE_BARCODESCAN_RECEIVE_DATA_HOOK';      // *** Event name to act as "hook" for data receiving
    this.pluginRef = 'DeviceBarcodeScan';                   // *** Plugin reference for Cordova.exec calls
}

//
DeviceBarcodeScan.prototype.init = function (successCallback, errorCallback) {
    'use strict';
    exec(successCallback, errorCallback, this.pluginRef, 'init', []);
};

//
DeviceBarcodeScan.prototype.receive = function (scanLabel, scanData, scanType) {
    'use strict';

    var evReceive = document.createEvent('Events');

    evReceive.initEvent(this.receiveHookName, true, true);
    evReceive.metadata = {
        scan: {
            label: scanLabel,
            data: scanData,
            type: scanType,
        }
    };

    document.dispatchEvent(evReceive);
};

DeviceBarcodeScan.prototype.stop = function (successCallback, errorCallback) {
    'use strict';
    exec(successCallback, errorCallback, this.pluginRef, 'init', []);
};

module.exports = new DeviceBarcodeScan();
