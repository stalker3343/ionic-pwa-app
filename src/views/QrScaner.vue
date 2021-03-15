<template>
  <ion-page>
    <app-header>
      Qr scaner
    </app-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-label>Result:</ion-label>

            <ion-textarea
              autoGrow
              placeholder="Qr value"
              readonly
              v-model="qrLink"
            ></ion-textarea>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-button expand="block" @click="scan">
              Scan
            </ion-button>
          </ion-col>
          <ion-col>
            <ion-button
              expand="block"
              v-if="qrLink"
              @click="writeLinkToClipboard"
            >
              Copy to Clipboard
            </ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-button
              v-if="isQrUrl"
              expand="block"
              @click="writeLinkInBrowser"
            >
              Open in browser
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonButton,
  IonPage,
  IonContent,
  IonCol,
  IonGrid,
  IonRow,
  IonLabel,
  IonTextarea,
} from "@ionic/vue";
import { defineComponent, onMounted, computed } from "vue";
import AppHeader from "@/components/AppHeader.vue";
import { useBarCodeScaner } from "@/composables/useBarCodeScaner";
import { useClipboad } from "@/composables/useClipboad";
import { useBrowser } from "@/composables/useBrowser";

import { isValidURL } from "@/helpers";

export default defineComponent({
  name: "HomePage",
  components: {
    AppHeader,
    IonButton,
    IonPage,
    IonContent,

    IonTextarea,
    IonCol,
    IonGrid,
    IonRow,
    IonLabel,
  },
  setup() {
    const { scan, scanRes } = useBarCodeScaner();
    const { writeToClipboard } = useClipboad();
    const { open: openInBrowser } = useBrowser();

    const qrLink = computed(() => {
      return scanRes.value ? scanRes.value.text : "";
    });

    const isQrUrl = computed(() => {
      return isValidURL(qrLink.value);
    });

    onMounted(() => {
      scan();
    });
    const writeLinkToClipboard = () => {
      writeToClipboard(qrLink.value);
    };
    const writeLinkInBrowser = () => {
      openInBrowser(qrLink.value);
    };

    return {
      qrLink,
      scan,
      writeLinkToClipboard,
      isQrUrl,
      writeLinkInBrowser,
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
