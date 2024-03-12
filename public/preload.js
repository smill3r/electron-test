const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  minimize: () => ipcRenderer.send("minimize-window"),
  maximize: () => ipcRenderer.send("maximize-window"),
  close: () => ipcRenderer.send("close-window"),
  new: (params) => ipcRenderer.send("new-window", params),
  showContextMenu: () => ipcRenderer.send("show-context-menu"),
  onContextSelected: (event) => ipcRenderer.once("context-menu-command", event),
  onActiveTabSet: (event) => ipcRenderer.once("active-tab", event),
});
