<template>
  <ion-page>
    <app-header>
      Home
    </app-header>

    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col size="6">
            <ion-card
              router-link="/qr-scaner"
              button
              class="ion-no-margin"
              color="dark"
            >
              <ion-card-header class="ion-text-center">
                <ion-icon size="large" :icon="triangle" />
                <div class="card-text">
                  Qr code <br />
                  scanner
                </div>
              </ion-card-header>
            </ion-card>
          </ion-col>
          <ion-col size="6">
            <ion-card class="ion-no-margin" color="dark">
              <ion-card-header class="ion-text-center">
                <ion-icon size="large" :icon="triangle" />
                <div class="card-text">
                  Produscto products
                </div>
              </ion-card-header>
            </ion-card>
          </ion-col>
          <ion-col size="6">
            <ion-card class="ion-no-margin" color="dark">
              <ion-card-header class="ion-text-center">
                <ion-icon size="large" :icon="triangle" />
                <div class="card-text">
                  Produscto products
                </div>
              </ion-card-header>
            </ion-card>
          </ion-col>
          <ion-col size="6">
            <ion-card class="ion-no-margin" color="dark">
              <ion-card-header class="ion-text-center">
                <ion-icon size="large" :icon="triangle" />
                <div class="card-text">
                  Produscto products
                </div>
              </ion-card-header>
            </ion-card>
          </ion-col>
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
} from "@ionic/vue";
import { menuOutline, triangle, personCircleOutline } from "ionicons/icons";

import { defineComponent } from "vue";
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
    // IonCardContent,
    // IonCardSubtitle,
    // IonCardTitle,
    IonIcon,

    // IonLabel,
  },
  setup() {
    return {
      menuOutline,
      triangle,
      personCircleOutline,
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
