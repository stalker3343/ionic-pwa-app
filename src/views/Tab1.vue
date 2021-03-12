<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <ion-item :key="t.id" v-for="t in todos">
          <ion-label>{{ t.content }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <ion-input placeholder="Enter Item" v-model="inputState"></ion-input>
        <ion-button @click="addTodo" slot="end">Add</ion-button>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script lang="js">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonFooter,
  IonButton,
  IonInput,
} from "@ionic/vue";

export default {
  name: "Tab1",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonList,
    IonItem,
    IonLabel,
    IonFooter,
    IonButton,
    IonInput,
  },
  data: () => ({
    todos: [
      { id: 1, content: "Do the laundry" },
      { id: 2, content: "Buy Christmas gifts" },
      { id: 3, content: "Spellcheck my draft" },
    ],
    inputState: "",
  }),
  methods: {
    addTodo() {
      this.todos.push({
        id: this.todos.length,
        content: this.inputState,
      });
      this.inputState = "";
    },
  },
};
</script>
