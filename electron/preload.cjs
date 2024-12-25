const { contextBridge } = require('electron');

// Expose any required APIs to renderer process here
contextBridge.exposeInMainWorld('electron', {
  // Add any required methods here
});