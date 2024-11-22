// main.js
const obj_div_str = document.querySelector('#obj_div');

const canvasElement = document.querySelector('.canvasElement_className');

if (window.Worker) {

	// [0] Get data from index.html 
	
	const index_data = obj_div_str.textContent
	// console.log("main.js - index_data: ", index_data);
	
	// --------------------

	// [1] Define parallel processing variable parallel_processing
	var out = index_data.split('|');   	// `file_name|${file_name}|data|${normalArray}|type|process`
	console.log("out: ", out);
	
	const file_name = out.at(1);
	console.log("file_name: ", file_name);
	
	const parallel_processing = new Worker(`./cfg/${file_name}`);

	// --------------------

	// [2] Send process to parallel_processing.js

	const obj_payload = eval(out.at(3));
	console.log("obj_payload: ", obj_payload);
	
	parallel_processing.postMessage(obj_payload);
	
	// --------------------

	// [3] WAIT for processed data from parallel_processing.js
	
	// Use eventListener
	parallel_processing.addEventListener("message", process_message, false);
	parallel_processing.addEventListener("messageerror", process_messageerror, false);
	parallel_processing.addEventListener("error", process_error, false);

	// --------------------

	// [4] RECEIVE data from parallel_processing.js
	
	function process_message(event) {
		
		console.log("main.js - addEventListener parallel_processing message");
	  
		// console.log("main.js - processed_data - event.data: ", event.data);
	
		// Draw parallel processed data on canvas - drawing can only be performed on the main thread
		const imageData = new ImageData(event.data, canvasElement.width, canvasElement.height);
		canvasElement.getContext("2d").putImageData(imageData, 0, 0);
	  
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
