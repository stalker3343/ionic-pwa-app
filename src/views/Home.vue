<template>
  <ion-page>
    <app-header>
      Home
    </app-header>

    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col size="6" class="d-flex">
            <ion-card
              router-link="/qr-scaner"
              button
              class="ion-no-margin app-card"
              color="dark"
            >
              <ion-card-header class="ion-text-center">
                <ion-icon size="large" :icon="triangle" />
                <div class="card-text">
                  Qr code scanner
                </div>
              </ion-card-header>
            </ion-card>
          </ion-col>
          <ion-col size="6" class="d-flex">
            <ion-card
              router-link="/local-notifications"
              button
              class="ion-no-margin app-card"
              color="dark"
            >
              <ion-card-header class="ion-text-center">
                <ion-icon size="large" :icon="triangle" />
                <div class="card-text">
                  Local notifications
                </div>
              </ion-card-header>
            </ion-card>
          </ion-col>
          <ion-col size="6" class="d-flex">
            <ion-card class="ion-no-margin app-card" color="dark">
              <ion-card-header class="ion-text-center">
                <ion-icon size="large" :icon="triangle" />
                <div class="card-text">
                  Produscto products
                </div>
              </ion-card-header>
            </ion-card>
          </ion-col>
          <ion-col size="6" class="d-flex">
            <ion-card class="ion-no-margin app-card" color="dark">
              <ion-card-header class="ion-text-center">
                <ion-icon size="large" :icon="triangle" />
                <div class="card-text">
                  Produscto products
                </div>
              </ion-card-header>
            </ion-card>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col> devicesList: {{ devicesList }} </ion-col>
        </ion-row>

        <ion-row>
          <ion-col> platform: {{ platform }} </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import {
  IonCard,
  IonCol,
  IonGrid,
  IonRow,
  IonIcon,
  IonPage,
  IonContent,
  IonCardHeader,
} from "@ionic/vue";
import { menuOutline, triangle, personCircleOutline } from "ionicons/icons";

import { defineComponent, ref } from "vue";
import AppHeader from "@/components/AppHeader.vue";

export default defineComponent({
  name: "HomePage",
  components: {
    IonCard,
    IonCol,
    IonGrid,
    IonRow,
    AppHeader,
    IonPage,
    IonContent,
    IonCardHeader,
    // IonCardContent,
    // IonCardSubtitle,
    // IonCardTitle,
    IonIcon,

    // IonLabel,
  },
  setup() {
    const platform = navigator.platform;
    const devicesList = ref("");
    const getEnumerableDevices = async () => {
      await navigator.mediaDevices.getUserMedia({ video: true });

      const res = await navigator.mediaDevices.enumerateDevices();
      res.forEach(function(device) {
        devicesList.value +=
          device.kind + ": " + device.label + " id = " + device.deviceId + "\n";
      });
    };
    getEnumerableDevices();

    return {
      menuOutline,
      triangle,
      personCircleOutline,
      devicesList,
      platform,
    };
  },
});
</script>

<style scoped>
.app-card {
  width: 100%;
}
.card-text {
  font-size: 18px;
  padding-top: 8px;
}
.d-flex {
  display: flex;
}
</style>
