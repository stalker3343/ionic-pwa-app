import { ref, Ref } from "vue";
import { ReadResult, Clipboard } from "@capacitor/clipboard";

export function useClipboad() {

  const content: Ref<null | ReadResult> = ref(null);

  const writeToClipboard = async (text: string) => {
    await Clipboard.write({
      string: text,
    });
  };

  const readClipboard = async () => {
    content.value = await Clipboard.read();
  };
  return {
    writeToClipboard,
    readClipboard,
    content,
  };
}
