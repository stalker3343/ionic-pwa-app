<template>
  <div class="app__layout">
    <main class="app__layout-content">
      <video autoplay></video>

      <!-- Dialog  -->
      <div class="app__dialog app__dialog--hide">
        <div class="app__dialog-content">
          <h5>QR Code</h5>
          <input type="text" id="result" />
        </div>
        <div class="app__dialog-actions">
          <button type="button" class="app__dialog-open">Open</button>
          <button type="button" class="app__dialog-close">Close</button>
        </div>
      </div>

      <div class="app__dialog-overlay app__dialog--hide"></div>

      <!-- Snackbar -->
      <div class="app__snackbar"></div>
    </main>
  </div>
  <div class="app__overlay">
    <div class="app__overlay-frame"></div>
    <!-- Scanner animation -->
    <div class="custom-scanner"></div>
    <div class="app__help-text"></div>
  </div>

  <div class="app__select-photos">
    <ion-icon size="large" :icon="cameraOutline"></ion-icon>
  </div>

  <button
    ref="hackOpenWindowBtn"
    v-show="false"
    :onclick="openHackWindowHandler"
  ></button>
</template>

<script lang="js">
import {
  defineComponent,
  onMounted,
  watchEffect,
  ref,
  Ref,
  computed,
} from "vue";
import { IonIcon } from "@ionic/vue";
import QRReader from "@/mobileServices/qrscan.js";
import { isURL, hasProtocolInUrl } from "@/helpers";
import { cameraOutline } from "ionicons/icons";

export default defineComponent({
  name: "QrCodeScaner",
  components: { IonIcon },
  setup() {
    const copiedText = ref("");
    const normalizedCopiedText = computed(() => {
      if (!hasProtocolInUrl(copiedText.value)) {
        return `//${copiedText.value}`;
      }
      return copiedText.value;
    });
    const hackOpenWindowBtn = ref();

    const openHackWindowHandler = () => {
      // window.open(normalizedCopiedText.value, "_blank");
      window.location.assign(normalizedCopiedText.value);
    };

    onMounted(() => {
      window.iOS = ["iPad", "iPhone", "iPod"].indexOf(navigator.platform) >= 0;
      window.isMediaStreamAPISupported =
        navigator &&
        navigator.mediaDevices &&
        "enumerateDevices" in navigator.mediaDevices;
      window.noCameraPermission = false;

      let frame = null;
      const selectPhotoBtn = document.querySelector(".app__select-photos");
      const dialogElement = document.querySelector(".app__dialog");
      const dialogOverlayElement = document.querySelector(
        ".app__dialog-overlay"
      );
      const dialogOpenBtnElement = document.querySelector(".app__dialog-open");
      const dialogCloseBtnElement = document.querySelector(
        ".app__dialog-close"
      );
      const scanningEle = document.querySelector(".custom-scanner");
      const textBoxEle = document.querySelector("#result");
      const helpTextEle = document.querySelector(".app__help-text");
      const videoElement = document.querySelector("video");
      window.appOverlay = document.querySelector(".app__overlay");

      function setCameraOverlay() {
        window.appOverlay.style.borderStyle = "solid";
      }

      function createFrame() {
        frame = document.createElement("img");
        frame.src = "";
        frame.id = "frame";
      }

      //Hide dialog
      function hideDialog() {
        copiedText.value = "";
        textBoxEle.value = "";

        if (!window.isMediaStreamAPISupported) {
          frame.src = "";
          frame.className = "";
        }

        dialogElement.classList.add("app__dialog--hide");
        dialogOverlayElement.classList.add("app__dialog--hide");
      }

      //To open result in browser

      //Dialog close btn event
      dialogCloseBtnElement.addEventListener("click", hideDialog, false);
      // dialogOpenBtnElement.addEventListener(
      //   "click",
      //   hackOpenWindowBtn.value.click,
      //   false
      // );

      //Scan
      function scan(forSelectedPhotos = false) {
        if (window.isMediaStreamAPISupported && !window.noCameraPermission) {
          scanningEle.style.display = "block";
        }

        if (forSelectedPhotos) {
          scanningEle.style.display = "block";
        }

        const scanSuccessCallback = (result) => {
          console.log("in scanSuccessCallback");

          copiedText.value = result;
          textBoxEle.value = result;
          textBoxEle.select();
          scanningEle.style.display = "none";
          if (isURL(result)) {
            console.log("isURL");
            console.log(normalizedCopiedText.value, "normalizedCopiedText");

            hackOpenWindowBtn.value.click();
          }
          // dialogElement.classList.remove("app__dialog--hide");
          // dialogOverlayElement.classList.remove("app__dialog--hide");
        };

        QRReader.scan(scanSuccessCallback, forSelectedPhotos);
      }

      function selectFromPhoto() {
        //Creating the camera element
        const camera = document.createElement("input");
        camera.setAttribute("type", "file");
        camera.setAttribute("capture", "camera");
        camera.id = "camera";
        window.appOverlay.style.borderStyle = "";
        selectPhotoBtn.style.display = "block";
        createFrame();

        //Add the camera and img element to DOM
        const pageContentElement = document.querySelector(
          ".app__layout-content"
        );
        pageContentElement.appendChild(camera);
        pageContentElement.appendChild(frame);

        //Click of camera fab icon
        selectPhotoBtn.addEventListener("click", () => {
          scanningEle.style.display = "none";
          document.querySelector("#camera").click();
        });

        //On camera change
        camera.addEventListener("change", (event) => {
          if (event.target && event.target.files.length > 0) {
            frame.className = "app__overlay";
            frame.src = URL.createObjectURL(event.target.files[0]);
            if (!window.noCameraPermission) scanningEle.style.display = "block";
            window.appOverlay.style.borderColor = "rgb(62, 78, 184)";
            scan(true);
          }
        });
      }

      QRReader.init(); //To initialize QR Scanner
      // Set camera overlay size
      setTimeout(() => {
        setCameraOverlay();

        if (window.isMediaStreamAPISupported) {
          scan();
        }
      }, 1000);

      // To support other browsers who dont have mediaStreamAPI
      selectFromPhoto();
    });

    return {
      cameraOutline,
      hackOpenWindowBtn,
      normalizedCopiedText,
      openHackWindowHandler,
    };
  },
});
</script>

<style>
.app__layout {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5);
}

.app__layout-content {
  height: inherit;
  /*margin-top: 56px;*/
}

.custom-menu-icon {
  font-size: 28px;
  line-height: 47px;
}

.custom-title,
.custom-menu-icon {
  color: #fff;
}

.custom-btn {
  position: fixed;
  right: 26px;
  bottom: 26px;
  background: #448aff;
  border-radius: 50%;
  border: none;
  width: 56px;
  height: 56px;
  outline: none;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  z-index: 9999;
}

.custom-btn:active {
  box-shadow: none;
}

.custom-msg {
  text-align: center;
  width: 90%;
  height: 50%;
  overflow: auto;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  font-size: 16px;
}

.custom-fab-icon {
  color: #fff;
  font-size: 30px;
  margin-top: 2px;
  user-select: none;
}

video {
  transform: translateX(-50%) translateY(-50%);
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  position: absolute;
}

#list li {
  list-style-type: none;
  text-decoration: underline;
  color: #00f;
}

.custom-copy-btn {
  opacity: 0;
}

.hide {
  display: none;
}

@-webkit-keyframes scanner {
  0% {
    bottom: 100%;
  }
  50% {
    bottom: 0%;
  }
  100% {
    bottom: 100%;
  }
}

@-moz-keyframes scanner {
  0% {
    bottom: 100%;
  }
  50% {
    bottom: 0%;
  }
  100% {
    bottom: 100%;
  }
}

@-o-keyframes scanner {
  0% {
    bottom: 100%;
  }
  50% {
    bottom: 0%;
  }
  100% {
    bottom: 100%;
  }
}

@keyframes scanner {
  0% {
    bottom: 100%;
  }
  50% {
    bottom: 0%;
  }
  100% {
    bottom: 100%;
  }
}

.custom-scanner {
  width: 100%;
  height: 2px;
  background: #4caf50;
  position: absolute;
  -webkit-transition: all 200ms linear;
  -moz-transition: all 200ms linear;
  transition: all 200ms linear;
  -webkit-animation: scanner 3s infinite linear;
  -moz-animation: scanner 3s infinite linear;
  -o-animation: scanner 3s infinite linear;
  animation: scanner 3s infinite linear;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.4);
  display: none;
}

#camera {
  opacity: 0;
}

.no-support {
  font-size: 20px;
  text-align: center;
}

.app__snackbar {
  position: fixed;
  bottom: 15px;
  left: 20px;
  pointer-events: none;
  z-index: 9999;
}

.app__snackbar-msg {
  width: 250px;
  min-height: 50px;
  background-color: #404040;
  color: #fff;
  border-radius: 3px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 500;
  padding-left: 15px;
  padding-right: 10px;
  word-break: break-all;
  -webkit-transition: opacity 3s cubic-bezier(0, 0, 0.3, 1) 0;
  transition: opacity 0.3s cubic-bezier(0, 0, 0.3, 1) 0;
  text-transform: initial;
  margin-bottom: 10px;
  z-index: 9999;
}

.app__snackbar--hide {
  opacity: 0;
}

.app__dialog {
  z-index: 12;
  background-color: #fff;
  width: 290px;
  height: 180px;
  border-radius: 2px;
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
  box-shadow: 0 9px 46px 8px rgba(0, 0, 0, 0.14),
    0 11px 15px -7px rgba(0, 0, 0, 0.12), 0 24px 38px 3px rgba(0, 0, 0, 0.2);
}

.app__dialog h5 {
  margin-top: 20px;
  margin-left: 18px;
  font-weight: 500;
}

.app__dialog input {
  width: 250px;
  margin: 20px;
  height: 30px;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  outline: none;
  font-size: 15px;
  margin-top: 25px;
  color: rgba(0, 0, 0, 0.54);
  font-weight: 500;
}

.app__dialog-actions {
  display: block;
  position: absolute;
  bottom: 13px;
  right: 20px;
}

.app__dialog-open,
.app__dialog-close {
  border: 0;
  height: 35px;
  width: 70px;
  font-size: 16px;
  background: transparent;
  font-weight: 500;
  outline: none;
  cursor: pointer;
}

.app__dialog-open {
  display: none;
}

.app__dialog-open:active,
.app__dialog-close:active {
  opacity: 0.9;
}

.app__dialog--hide {
  display: none;
}

.app__overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  transition: all 200ms ease-in;
  width: 320px;
  height: 320px;
  margin: auto;
}

.app__overlay-left,
.app__overlay-right {
  width: 52px;
  height: 340px;
  background: #7f7f7f;
}

.app__overlay-left {
  margin-left: -57px;
  margin-top: -10px;
}

.app__overlay-right {
  margin-right: -57px;
  margin-top: -340px;
  float: right;
}

.app__overlay {
  border: 0;
}

.app__help-text,
.app__select-photos {
  color: #fff;
  position: absolute;
  bottom: -70px;
  font-size: 18px;
  right: 0;
  text-align: center;
  user-select: none;
}

.app__help-text {
  display: none;
  left: 0;
}

.app__dialog-overlay {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 11;
}

.camera__icon,
.focus__icon {
  position: relative;
  left: 10px;
  display: none;
}

.app__select-photos {
  width: 58px;
  height: 58px;
  cursor: pointer;
  position: fixed;
  bottom: 20px;
  right: 20px;
  border-radius: 50%;
  background-color: #3f51b5;

  padding-top: 12px;

  /* background-repeat: no-repeat;
  background-size: 26px;
  background-position: 16px 15px; */
}

.app__select-photos:active {
  opacity: 0.8;
}

input[type="file"] {
  display: none;
}

#frame {
  width: auto;
  height: auto;
}
</style>
