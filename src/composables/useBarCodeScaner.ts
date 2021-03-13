// import { ref, onMounted, watch } from 'vue';



import {BarcodeScanner}  from "@ionic-native/barcode-scanner";

export  function useBarCodeScaner() {

  const scan = async () => {

    const cameraPhoto =   await BarcodeScanner.scan()
    console.log(cameraPhoto);
    
  };

  return {
    scan
  };
}