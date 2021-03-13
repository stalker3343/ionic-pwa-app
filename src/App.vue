<template>
  <ion-app>
    <ion-menu side="start" menu-id="first" content-id="main">
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-menu-toggle auto-hide="true">
            <ion-item router-link="/" lines="none" button>
              <ion-icon slot="start" :icon="personCircleOutline"></ion-icon>
              <ion-label>
                Home
              </ion-label>
            </ion-item>
          </ion-menu-toggle>
          <ion-menu-toggle auto-hide="true">
            <ion-item lines="none" button>
              <ion-icon slot="start" :icon="personCircleOutline"></ion-icon>
              <ion-label>
                Settings
              </ion-label>
            </ion-item>
          </ion-menu-toggle>
          <ion-menu-toggle auto-hide="true">
            <ion-item lines="none" button>
              <ion-icon slot="start" :icon="personCircleOutline"></ion-icon>
              <ion-label>
                Exit
              </ion-label>
            </ion-item>
          </ion-menu-toggle>
        </ion-list>
      </ion-content>
    </ion-menu>
    <ion-router-outlet id="main"></ion-router-outlet>
  </ion-app>
</template>

<script lang="ts">
import {
  IonApp,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenu,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
  IonMenuButton,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonRow,
  IonIcon,
  IonMenuToggle,
  IonLabel,
} from "@ionic/vue";
import { menuOutline, triangle, personCircleOutline } from "ionicons/icons";

import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonMenu,
    IonTitle,
    IonToolbar,

    // IonCardContent,
    // IonCardSubtitle,
    // IonCardTitle,
    IonIcon,

    IonMenuToggle,
    IonLabel,
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
