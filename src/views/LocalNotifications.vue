<template>
  <ion-page>
    <app-header>
      Qr scaner
    </app-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-label>Notification text:</ion-label>
            <ion-input placeholder="Notif text" v-model="notifText"></ion-input>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-label>Notification interval:</ion-label>
            <ion-input
              required
              type="number"
              placeholder="Notif interval"
              v-model="notifInterval"
            ></ion-input>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-button expand="block" @click="sendNotifNowOnce">
              Sent notification now once
            </ion-button>
          </ion-col>
          <ion-col>
            <ion-button disabled expand="block" @click="sendNotifByShadule">
              Sent notification every {{ notifInterval }} minutes
            </ion-button>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col>
            <ion-button disabled expand="block" @click="clearAllNotif">
              Clear all shaduled notifications
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
  IonInput,
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import AppHeader from "@/components/AppHeader.vue";
import { useLocalNotifications } from "@/composables/useLocalNotifications";

export default defineComponent({
  name: "HomePage",
  components: {
    AppHeader,
    IonButton,
    IonPage,
    IonContent,

    IonInput,
    IonCol,
    IonGrid,
    IonRow,
    IonLabel,
  },
  setup() {
    const { onceNotif } = useLocalNotifications();

    const notifText = ref("");
    const notifInterval = ref(8);
    const sendNotifNowOnce = () => {
      onceNotif(notifText.value);
    };
    const clearAllNotif = () => {
      console.log("clearAllNotif");
    };
    const sendNotifByShadule = () => {
      console.log("clearAllNotif");
    };

    return {
      notifText,
      sendNotifNowOnce,
      notifInterval,
      clearAllNotif,
      sendNotifByShadule,
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
