export function isValidURL(str: string) {
  // var pattern = new RegExp(
  //   "^(https?:\\/\\/)?" + // protocol
  //   "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
  //   "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
  //   "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
  //   "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
  //     "(\\#[-a-z\\d_]*)?$",
  //   "i"
  // ); // fragment locator

  const urlRegex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

  return !!urlRegex.test(str);
}

export const isURL = (url = "") => {
  if (!url || typeof url !== "string") {
    return false;
  }

  const protocol = "^(https?:\\/\\/)?";
  const domain = "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|";
  const ip = "((\\d{1,3}\\.){3}\\d{1,3}))";
  const port = "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*";
  const queryString = "(\\?[;&a-z\\d%_.~+=-]*)?";
  const fragmentLocater = "(\\#[-a-z\\d_]*)?$";

  const regex = new RegExp(
    `${protocol + domain + ip + port + queryString + fragmentLocater}`,
    "i"
  );

  return regex.test(url);
};

export const hasProtocolInUrl = (url = "") => {
  const protocol = "^(https?:\\/\\/)";
  const regex = new RegExp(protocol, "i");
  return regex.test(url);
};
