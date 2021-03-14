<template>
  <ion-header>
    <ion-toolbar>
      <ion-menu-button slot="start"></ion-menu-button>

      <ion-button fill="clear" slot="end">
        <ion-icon slot="icon-only" :icon="personCircleOutline"></ion-icon>
      </ion-button>

      <!-- <ion-icon  :icon="triangle"></ion-icon> -->

      <ion-title>
        <slot></slot>
      </ion-title>
    </ion-toolbar>
  </ion-header>
</template>
<script lang="ts">
import {
  IonIcon,
  IonMenuButton,
  IonButton,
  IonTitle,
  IonToolbar,
  IonHeader,
} from "@ionic/vue";
import { menuOutline, triangle, personCircleOutline } from "ionicons/icons";

import { defineComponent } from "vue";

export default defineComponent({
  name: "HomePage",
  components: {
    // IonCardContent,
    // IonCardSubtitle,
    // IonCardTitle,
    IonIcon,
    IonHeader,
    IonButton,
    IonToolbar,
    IonTitle,

    IonMenuButton,
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
