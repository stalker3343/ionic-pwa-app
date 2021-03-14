import { ref, Ref } from 'vue';

import {BarcodeScanner,BarcodeScanResult  }  from "@ionic-native/barcode-scanner";

export  function useBarCodeScaner() {
  const scanRes: Ref<null | BarcodeScanResult>  = ref(null)

  const scan = async () => {
      try {
        scanRes.value = await BarcodeScanner.scan({
          preferFrontCamera: false, // iOS and Android
          showFlipCameraButton: true, // iOS and Android
          showTorchButton: true, // iOS and Android
          torchOn: false, // Android, launch with the torch switched on (if available)
          // saveHistory: true, // Android, save scan history (default false)
          prompt: "Place a qrcode inside the scan area", // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
          orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations: true, // iOS
          disableSuccessBeep: false, // iOS and Android
        });
      } catch (error) {
        alert("Scanning failed: " + error);
      }
  };



  return {
    scan,
    scanRes
  };
}