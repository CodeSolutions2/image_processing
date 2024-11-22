// draw_image_w_ParallelProcessing_main.js
// Using a Worker in JavaScript requires a separate JavaScript file because Workers run in a separate thread and need to be loaded from an external file due to security restrictions.
const obj_div_str = document.querySelector('#obj_div');

const canvasElement = document.querySelector('.canvasElement_className');

if (window.Worker) {
	
	// [0] Define parallel processing variable
	const parallel_processing = new Worker('./cfg/draw_image_w_ParallelProcessing.js');

	// --------------------

	// [1] Get data from index.html - SEND data to draw_image_w_ParallelProcessing.js
	const obj_div = JSON.parse(obj_div_str.textContent);
	// console.log("main.js - obj_div: ", obj_div);
	
	parallel_processing.postMessage(obj_div);

	// --------------------

	// [2] WAIT for processed data from draw_image_w_ParallelProcessing.js
	
	// Use eventListener
	parallel_processing.addEventListener("message", process_message, false);
	parallel_processing.addEventListener("messageerror", process_messageerror, false);
	parallel_processing.addEventListener("error", process_error, false);

	// --------------------

	function process_message(event) {
		
		// [3] RECEIVE data from draw_image_w_ParallelProcessing.js
		console.log("main.js - addEventListener parallel_processing message");
	  
		// console.log("main.js - processed_data - event.data: ", event.data);
	
    console.log("main.js - DONE");
    
		// console.log("main.js - event: ", event);

		// Remove from thread
		parallel_processing.terminate();
		
	}
	
	function process_messageerror(event) {
		console.log("main.js - addEventListener parallel_processing messageerror");
		// console.log("main.js - event: ", event);

		// Remove from thread
		parallel_processing.terminate();
	}
	
	function process_error(event) {
		console.log("main.js - addEventListener parallel_processing error");
		// console.log("main.js - event: ", event);

		// Remove from thread
		parallel_processing.terminate();
	}
	
	// --------------------
  
} else {
	console.log('main.js - The browser does not support the JavaScript function Worker.');
}
