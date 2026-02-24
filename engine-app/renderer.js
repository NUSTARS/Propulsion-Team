// renderer.js
//
// controls rendering processes
// or something like that

// constant holding the division where the canvases are stored
const canvasDiv = document.getElementById('canvas-division');
canvasDiv.style.height = '200px';

const switchDiv = document.getElementById('switch-division');

// SensorGraph class
class SensorGraph {
	// constructor
	// takes in an id of an html canvas element and a title
	// todo: add a data interpretation function? (ie scale integer to interpretable value)
	constructor(title, interpFn = (x) => x) {
		this.interpFn = interpFn;
		this.dataPoints = {
			labels: [],
			datasets: [{
				label: '',
				data: []
			}]
		}
		let thisDiv = document.createElement('div');
		thisDiv.style.display = 'inline-block';
		thisDiv.style.width = '200px';
		thisDiv.style.height = '200px';
		canvasDiv.appendChild(thisDiv);
		this.canvas = document.createElement('canvas');
		thisDiv.appendChild(this.canvas);
		this.chart = new Chart(
			this.canvas,
			{
				type: 'line',
				data: this.dataPoints,
				options: {
					plugins: {
						legend: {
							display: false,
						},
						title: {
							display: true,
							text: title,
						}
					},
					aspectRatio: 1,
					animation: false, // set this to true if we want stuff to be animated
				}
			}
		);
	}
	
	

	// adds an (x, y) pair to the line chart and updates the chart
	addPoint(x,y) {
		this.dataPoints.labels.push(x);
		this.dataPoints.labels = this.dataPoints.labels.slice(-50);
		this.dataPoints.datasets[0].data.push(this.interpFn(y));
		this.dataPoints.datasets[0].data = this.dataPoints.datasets[0].data.slice(-50);
		this.chart.data = this.dataPoints;
		// perhaps remove this and put it in a callback?
		this.chart.update();
	}
	
}

// Switch code! (YET TO BE TESTED---MAY HAVE BROKEN EVERYTHING)
const switchType = Object.freeze({
	RELAY: 'relay',
	SOLENOID: 'solenoid',
	MOTORIZED: 'motorized'
});

// const switchCount = 0;

// function activateSwitch() {

// }

// function createSwitch(switchType, labelText) {
// 	const checkbox = document.createElement('input');
// 	this.checkbox.type = 'checkbox';
// 	this.checkbox.id = switchType + '-' + switchCount.toString();

// 	const label = document.createElement('label');
// 	label.htmlFor = checkbox.id;
// 	label.appendChild(document.createTextNode(labelText));

// 	switchDiv.appendChild(checkbox);
// 	switchDiv.appendChild(label);
// 	switchDiv.appendChild(document.createElement('br'));

// 	checkbox.addEventListener('change', activateSwitch);
// 	++switchCount;
// }

let controlState = 0;

class BinaryActuator {
	constructor(name, byteNum, bit) {
		this.on = false;
		//this.type = controlledElement;
		// add checkbox to division
		this.checkbox = document.createElement('input');
		this.checkbox.type = 'checkbox';
		this.checkbox.id = "myCheckbox";

		this.boxLabel = document.createElement('label');
		this.boxLabel.innerText = name;
		this.boxLabel.id = "checkboxLabel";
		this.boxLabel.for = name;

		switchDiv.appendChild(this.boxLabel);
		switchDiv.appendChild(this.checkbox);

		this.name = name;
		this.byteNum = byteNum;
		this.bit = bit;

		this.checkbox.addEventListener('change', () => {
			this.on = !this.on
			// branch on bit manipulations to control state
			if (this.on) { 
				controlState |= 1 << this.bit;
			} else {
				controlState &= ~(1 << this.bit);
			}
			electronAPI.sendControlMessage(controlState);
		})
	}
}

// makes a pressure transducer interpretation function, 
// given the resistor's resistance
// in ohms as an input to the function
function makePTInterpFn(resistance) {
	// in omar we trust :)
	return (x) => (((3300/4095)/resistance) * x * 18.75) - 75
}

// (3.3/4095 * x) * 18.75 - 75
// some constants (temporary)
const num_graphs = 1;
let graphs = [];
for (let i = 0; i < num_graphs; i++) {
	graphs.push(new SensorGraph(i.toString(), (x) => 2*x));
}

solenoid1 = new BinaryActuator("Solenoid 1:", 0, 0)
solenoid2 = new BinaryActuator("Solenoid 2:", 0, 1)
servo1 = new BinaryActuator("Servo Ball Valve 1:", 0, 2)
servo2 = new BinaryActuator("Servo Ball Valve 2:", 0, 3)
sparkPlug = new BinaryActuator("Sparkplug:", 0, 4)




// Main execution (we could put it in a function, but idk what to call it (this is me attempting to be funny))

let counter = 0;
window.electronAPI.onSerialPacket((packet) => {
	
	for (let i = 0; i < num_graphs; i++) {
		value = graphs[i].interpFn(packet[i] + (packet[i+1] << 8)); //this may be backwards
		graphs[i].addPoint(counter, value);
	}
	
	counter += 1;
})





