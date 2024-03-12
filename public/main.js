const { app, BrowserWindow, ipcMain, Menu } = require("electron");

const windows = new Set();

const createWindow = (params = []) => {
  const currentWindow = BrowserWindow.getFocusedWindow();

  let x, y;

  if (currentWindow) {
    const [currentWindowX, currentWindowY] = currentWindow.getPosition();
    x = currentWindowX + 24;
    y = currentWindowY + 24;
  }

  let newWindow = new BrowserWindow({
    width: 800,
    height: 600,
    x,
    y,
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + "/preload.js",
    },
    frame: false,
  });

  newWindow.loadURL("http://localhost:3000");

  newWindow.webContents.on("did-finish-load", () => {
    if (!newWindow) {
      throw new Error("New window is not defined");
    }
    newWindow.show();
    newWindow.focus();
    if (params.length > 0) {
      newWindow.webContents.send("active-tab", params);
    }
  });

  newWindow.on("closed", () => {
    windows.delete(newWindow);
    newWindow = null;
  });

  windows.add(newWindow);
};

const closeWindow = (event) => {
  const currentWindow = BrowserWindow.getFocusedWindow();
  if (currentWindow) {
    currentWindow.close();
  }
};

const minimizeWindow = (event) => {
  const currentWindow = BrowserWindow.getFocusedWindow();
  if (currentWindow) {
    currentWindow.minimize();
  }
};

const maximizeWindow = (event) => {
  const currentWindow = BrowserWindow.getFocusedWindow();
  if (currentWindow) {
    currentWindow.maximize();
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  ipcMain.on("close-window", closeWindow);

  ipcMain.on("minimize-window", minimizeWindow);
  ipcMain.on("maximize-window", maximizeWindow);

  ipcMain.on("new-window", (event, params) => createWindow(params));

  ipcMain.on("show-context-menu", (event) => {
    const menuItems = getMenuItems(event);
    const menu = Menu.buildFromTemplate(menuItems);
    menu.popup({ window: BrowserWindow.fromWebContents(event.sender) });
  });

  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.

  if (windows.size === 0) {
    createWindow();
  }
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const getMenuItems = (event) => {
  return [
    {
      label: "Minimize",
      click: () => {
        event.sender.send("context-menu-command", "minimize");
      },
    },
    {
      label: "New Window",
      click: () => {
        event.sender.send("context-menu-command", "new");
      },
    },
    {
      label: "Full Screen",
      click: () => {
        event.sender.send("context-menu-command", "maximize");
      },
    },
    {
      label: "Close",
      click: () => {
        event.sender.send("context-menu-command", "close");
      },
    },
  ];
};
