import { Browser } from "@capacitor/browser";

export function useBrowser() {
  // const { Browser } = Plugins;

  const open = async (url: string) => {
    await Browser.open({ url });
  };

  return {
    open,
  };
}
