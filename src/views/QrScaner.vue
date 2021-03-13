<template>
  <ion-page>
    <app-header>
      Qr scaner
    </app-header>
    <ion-content>
      <div>Result: {{ qrLink }}</div>
      <ion-button @click="scan">
        Scan
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="js">
import { IonButton, IonPage, IonContent } from "@ionic/vue";
import { defineComponent, ref, onMounted } from "vue";
import AppHeader from "@/components/AppHeader.vue";
import { useBarCodeScaner } from "@/composables/useBarCodeScaner";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";

export default defineComponent({
  name: "HomePage",
  components: {
    AppHeader,
    IonButton,
    IonPage,
    IonContent,
  },
  setup() {
    // const { scan } = useBarCodeScaner();

    const qrLink = ref("");
    const scan = () => {
      // eslint-disable-next-line no-undef
      cordova.plugins.barcodeScanner.scan(
        function(result) {
          qrLink.value = result.text;
        },
        function(error) {
          alert("Scanning failed: " + error);
        },
        {
          preferFrontCamera: false, // iOS and Android
          showFlipCameraButton: true, // iOS and Android
          showTorchButton: true, // iOS and Android
          torchOn: true, // Android, launch with the torch switched on (if available)
          saveHistory: true, // Android, save scan history (default false)
          prompt: "Place a qrcode inside the scan area", // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
          orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations: true, // iOS
          disableSuccessBeep: false, // iOS and Android
        }
      );
    };
    onMounted(() => {
      scan();
    });

    return {
      qrLink,
      scan
    };
  },
});
</script>

<style scoped>
.card-text {
  font-size: 18px;
  padding-top: 8px;
}
</style>
