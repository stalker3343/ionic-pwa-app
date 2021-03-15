import { onMounted, ref, Ref } from "vue";
import {
  LocalNotifications,
  PermissionStatus,
} from "@capacitor/local-notifications";
const isNotifGranted = (status: PermissionStatus) =>
  status.display === "granted";

export function useLocalNotifications() {
  const checkPermissions = async () => {
    let permStatus = await LocalNotifications.checkPermissions();
    if (isNotifGranted(permStatus)) {
      permStatus = await LocalNotifications.requestPermissions();
      if (!isNotifGranted(permStatus)) {
        alert("Please allow notifications");
      }
    }
    return permStatus;
  };

  const onceNotif = async (text: string) => {
    const notifStatus = await checkPermissions();

    if (isNotifGranted(notifStatus)) {
      LocalNotifications.schedule({
        notifications: [
          {
            title: "NotifTitle",
            body: text,
            id: 1,
            extra: {
              data: "Pass data to handler",
              notId: 1,
            },
          },
        ],
      });
    }
  };
  return {
    onceNotif,
  };
}
