// init_renderer.js
//
// renderer process code for setup

// variables


// main process
function setup_main() {
	updateSerialPortSelect();
}


// handle pin selection =====
// TODO 

// handle serial port selection and option reloading
const serialPortSelect = document.getElementById("serialport-select");
const serialPortReloadButton = document.getElementById("setup::reload-serialport-options")

async function updateSerialPortSelect() {
	await electronAPI.getSerialPorts().then((ports,err) => {
		// handle errors
		if (err) {
			console.log(err);
			return;
		}
		// remove pre-existing options
		serialPortSelect.length = 0;
		// TODO(?): make a message appear when there are no serial ports available
		serialPortSelect.add(new Option('none','none'));
		// add available paths
		ports.forEach(port => {
			const newPortOption = new Option(port.path, port.path);
			serialPortSelect.add(newPortOption);
		});
	})
}

serialPortReloadButton.addEventListener("click", updateSerialPortSelect);



// handle button start button press
const initEngineCommsButton = document.getElementById("setup::init-engine-comms");

function initEngineCommunication() {
	const path = serialPortSelect.value;
	// check that we have valid port (!= none)
	if (path === 'none') {
		console.log("invalid path");
		return;
	}
	// send serial port path
	electronAPI.sendSerialPath(path);
	// send 
	
	// send message to load new page
	electronAPI.sendLoadMain();
}

initEngineCommsButton.addEventListener("click", initEngineCommunication);

// Handle valve toggling
const solenoid1Switch = document.getElementById("setup::solenoid-1");
const solenoid2Switch = document.getElementById("setup::solenoid-2");
const motorized1Switch = document.getElementById("setup::motorized-1");
const motorized2Switch = document.getElementById("setup::motorized-2");

setup_main();

// Defining format of configuration message
//


// DEFINING ENGINE CONFIGURATION OBJECT


/*
{
	"adc_pins" : [
		{
			"pin": P0,
			"function": (value) => {value}
		},
		{
			"pin": P1,
			"function": (value) => {
		}
	],
	"gpio_pins" : [
		{
			"pin": P3,
		}
	]
	"i2c" : {
		sda:
		scl: 
		addrs: [
			{
				a
			}
		
		]
	}
	
	
}




*/
