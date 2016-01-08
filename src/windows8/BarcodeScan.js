"use strict";

// Connection Class Definition
module.exports = function BarcodeScan() {

    var self = this,
        _scanner = null,
        _claimedScanner = null;

    // init - constructor
    self.init = function Initialize(success, fail) {
        var _success = success,
            _fail = fail;

        Windows.Devices.PointOfService.BarcodeScanner.getDefaultAsync().then(function (scanner) {
            if (scanner !== null) {
                _scanner = scanner;
                scanner.claimScannerAsync().done(function (claimedScanner) {
                    if (claimedScanner !== null) {
                        _claimedScanner = claimedScanner;
                        claimedScanner.isDecodeDataEnabled = true;

                        claimedScanner.addEventListener("datareceived", self.onDataReceived);
                        claimedScanner.addEventListener("releasedevicerequested", self.onReleasedeviceRequested);

                        claimedScanner.enableAsync().done(function () {
                            _success(_scanner);
                        }, function error(e) {
                            _fail("Error enabling scanner..." + e.message, "error");
                        });

                    } else {
                        _fail("Could not claim the scanner.", "error");
                    }
                }, function error(e) {
                    _fail("Could not claim the scanner." + e.message, "error");
                });

            } else {
                _fail("Barcode Scanner not found. Please connect a Barcode Scanner..", "error");
            }

        }, function error(e) {
            _fail("Scanner GetDefault Async Unsuccessful" + e.message, "error");
        });
    };

    self.onReleasedeviceRequested = function onReleasedeviceRequested(args) {
        _claimedScanner.retainDevice();
    };

    self.onDataReceived = function onDataReceived(args) {
        var tempScanLabel = Windows.Storage.Streams.DataReader.fromBuffer(args.report.scanDataLabel).readString(args.report.scanDataLabel.length);
        var tempScanData = Windows.Storage.Streams.DataReader.fromBuffer(args.report.scanData).readString(args.report.scanData.length);
        var tempScanType = args.report.scanDataType;

        self.onReceive(tempScanLabel, tempScanData, tempScanType);
    };

    self.endReceivingData = function endReceivingData(callback) {
        var _callback = callback;
        if (_claimedScanner !== null) {
            _claimedScanner.disableAsync().then(function (success) {
                _claimedScanner.removeEventListener("datareceived", self.onDataReceived);
                _claimedScanner.removeEventListener("releasedevicerequested", self.onReleasedeviceRequested);
                _claimedScanner.close();
                _claimedScanner = null;
                _scanner = null;
                _callback();
            }, function error(err) {
                _claimedScanner = null;
                _scanner = null;
                _callback();
            });

        } else {
            _callback();
        }
    };
};

// exporting module
require('cordova/windows8/commandProxy').add('BarcodeScan', module);
