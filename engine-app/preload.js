// preload.js
//
// exposes variables to the renderer process 
// or something like that

const { contextBridge, ipcRenderer } = require('electron');
const { SerialPort } = require('serialport');

contextBridge.exposeInMainWorld('electronAPI', {
	onSerialPacket: (callback) => ipcRenderer.on('serial-packet', (_event, value) => callback(value)),
	getSerialPorts: () => SerialPort.list(),
	sendSerialPath: (path) => ipcRenderer.send('serial-path', path),
	sendLoadMain: () => ipcRenderer.send('load-main'),
	sendControlMessage: (controlByte) => ipcRenderer.send('control-byte', controlByte)
});