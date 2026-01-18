// main.js
//
// main electron process or something like that

// requires
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const fs = require('node:fs')
const { SerialPort } = require('serialport')
const { ByteLengthParser } = require('@serialport/parser-byte-length')

// singleton main BrowserWindow object
let mainWindow;

// function for opening the window
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
	webPreferences: {
		sandbox: false,
		preload: path.join(__dirname, 'preload.js')
	}
  })

  mainWindow.loadFile('setup.html')
}


// opening the app
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// closing the app
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// handle serial port operation

let sp;
let parser;

// FIXME WHEN APPROPRIATE TIME COMES !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// HUGE SAFETY CONCERN HERE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// (MAYBE)

// initialize, but do not start serial port
ipcMain.on('serial-path', (_event, path) => {
	if (path !== 'none' && !sp) {
		sp = new SerialPort({path: path, baudRate: 9600, autoOpen: false});
	}
	else {
		// error
		// this should never run
		console.log("error: invaild serialport configuration");
	}
});

// load main page with all the graphs and buttons and stuff
ipcMain.on('load-main', () => {
	mainWindow.loadFile('index.html');
	startLogging();
});



//sp = new SerialPort({path: 'COM3', baudRate: 9600});
//ports = [];
//sp.flush();
//sp.open();


function startLogging() {
	parser = sp.pipe(new ByteLengthParser({length: 6}));
	sp.open(() => {sp.flush()}); //
	
	parser.on('data', (chunk) => {
		//console.log(chunk);
		// TODO: set up system of parsing serial packets
		
		// send chunk
		mainWindow.webContents.send('serial-packet', chunk);
		/*
		for (const value of chunk) {
			
			//fs.appendFile('temp_log.txt', String(value) + '\n', (err) => {});
		}
		*/
		// log chunk to file
	});
}
/*

*/