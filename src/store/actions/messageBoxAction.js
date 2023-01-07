export function displayMessageBox(messageContent) {
  return { type: "DISPLAY_MESSAGE_BOX", payload: messageContent };
}

export function hideMessageBox() {
  return { type: "HIDE_MESSAGE_BOX" };
}
