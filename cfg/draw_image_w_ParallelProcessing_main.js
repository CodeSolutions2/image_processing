// draw_image_w_ParallelProcessing_main.js
// Using a Worker in JavaScript requires a separate JavaScript file because Workers run in a separate thread and need to be loaded from an external file due to security restrictions.
const obj_div_str = document.querySelector('#obj_div');

const canvasElement = document.querySelector('.canvasElement_className');

if (window.Worker) {
	
	// [0] Define parallel processing variable
	const parallel_processing = new Worker('./cfg/draw_image_w_ParallelProcessing.js');
	
	// --------------------

	// [2] Get data from index.html - SEND data to draw_image_w_ParallelProcessing.js

	console.log("main.js - obj_div_str.textContent: ", obj_div_str.textContent);
	
	// const obj_div = JSON.parse(obj_div_str.textContent);
	// console.log("main.js - obj_div: ", obj_div);
	
	// parallel_processing.postMessage(obj_div);

	// --------------------

	// [3] WAIT for processed data from draw_image_w_ParallelProcessing.js
	
	// Use eventListener
	parallel_processing.addEventListener("message", process_message, false);
	parallel_processing.addEventListener("messageerror", process_messageerror, false);
	parallel_processing.addEventListener("error", process_error, false);

	// --------------------
	
	// [4] RECEIVE data from draw_image_w_ParallelProcessing.js
	
	function process_message(event) {
		
		console.log("main.js - addEventListener process_message - response from parallel_processing");

		// console.log("event: ", event);
		console.log("event.data: ", event.data);
		canvasElement.getContext("2d").putImageData(event.data, 0, 0);

		// Remove from thread
		parallel_processing.terminate();
		
	}
	
	function process_messageerror(event) {
		
		console.log("main.js - addEventListener process_messageerror - response from parallel_processing");
		
		// console.log("event: ", event);

		// Remove from thread
		parallel_processing.terminate();
	}
	
	function process_error(event) {
		
		console.log("main.js - addEventListener process_error - response from parallel_processing");
		
		// console.log("event: ", event);

		// Remove from thread
		parallel_processing.terminate();
	}
	
	// --------------------
  
} else {
	console.log('main.js - The browser does not support the JavaScript function Worker.');
}
