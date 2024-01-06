# Electron + React & TypeScript sample project

This repo contains a simple codebase for an example on how to implement React & TypeScript to an Electron project using the [Electron Forge](https://www.electronforge.io/guides/framework-integration/react-with-typescript) tool.

## Creating the base

Use Electron Forge's Webpack + TypeScript template to initialise the project:
```
npm init electron-app@latest sample -- --template=webpack-typescript
```

## Adding React

First add the following property to the _compilerOptions_ as the __tsconfig.json__ file:
```
"jsx": "react-jsx"
```
Now install the required dependencies for React:
```
npm i react react-dom --save
npm i @types/react @types/react-dom --save-dev
```
Clean the body at __src/index.html__ and declare the root like this:
```
<body>
    <div id="root"></div>
</body>
```
Create an entrypoint for your React code at __src/main.tsx__:
```
import React from "react";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        {/* App component goes here */}
    </React.StrictMode>
);
```
Now just import your entrypoint at __src/renderer.ts__:
```
import "./main";
```

## Implementing communication between Main process and React components

Suppose you want to call some API from Electron's Main process (show a notification) when a button is clicked in your React component, to add this feature you'll need to do the following:

- Set the plugin at the __package.json__ file:
```
{
    ...
    "plugins": [
    [
      "electron-forge/plugin-webpack",
      {
        "mainConfig": "./webpack.main.config.ts",
        "renderer": {
          "config": "./webpack.renderer.config.ts",
          "entryPoints": [
            {
              "html": "./src/index.html",
              "js": "./src/renderer.ts",
              "name": "main_window",
              "preload": {
                "js": "./src/preload.ts"
              }
            }
          ]
        }
      }
    ]
  ]
}
```
- Create the handler at __src/index.ts__ at the bottom of the file:
```
ipcMain.handle('SEND_NOTIFICATION', (_, message) => {
  new Notification({ title: 'New notification!', body: message }).show();
});
```
- Set in the webPreferences of the main BrowserWindow at __src/index.ts__ the following properties:
```
nodeIntegration: false,
contextIsolation: true,
```
- Using the contextBridge from Electron's API, add this at __src/preload.ts__:
```
import { ipcRenderer, contextBridge } from "electron";

contextBridge.exposeInMainWorld("electron", {
    notificationApi: {
        sendNotification(message: string) {
            ipcRenderer.send("SEND_NOTIFICATION", message);
        };
    },
});
```
- Now you should be able to access the _sendNotification_ function declared in the preload file via the window object:
```
window.electron.notificationApi.sendNotification("Hello World!");
```
- To properly type this new property of the window object, create an __index.d.ts__ file and add the following: 
```
export {}

declare global {
    interface Window {
        electron: {
            notificationApi: {
                sendNotification: (message: string) => void;
            }
        }
    }
}
```

You now should be ready to use any Main process API from a React component following the same steps of adding the handler, setting the contextBridge and accessing it via the window object.