import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
  },
  {
    name: "qr-scaner",
    path: "/qr-scaner",
    component: () => import("@/views/QrScaner.vue"),
  },
  {
    name: "local-notifications",
    path: "/local-notifications",
    component: () => import("@/views/LocalNotifications.vue"),
  },

  // {
  //   path: '/tabs/',
  //   component: Tabs,
  //   children: [
  //     {
  //       path: '',
  //       redirect: '/tabs/tab1'
  //     },
  //     {
  //       path: 'tab1',
  //       component: () => import('@/views/Tab1.vue')
  //     },
  //     {
  //       path: 'tab2',
  //       component: () => import('@/views/Tab2.vue')
  //     },
  //     {
  //       path: 'tab3',
  //       component: () => import('@/views/Tab3.vue')
  //     }
  //   ]
  // }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
