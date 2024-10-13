const { app, BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 540,
    height: 912,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/fate-npc-card/browser/index.html`),
      protocol: "file:",
      slashes: true,
    })
  );
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  setTimeout(() => mainWindow.webContents.reloadIgnoringCache(), 1000);

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  // if (process.platform !== "darwin") app.quit();
  app.quit();
});

app.on("activate", function () {
  if (mainWindow === null) createWindow();
});
