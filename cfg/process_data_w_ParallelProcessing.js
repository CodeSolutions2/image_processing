// process_data_w_ParallelProcessing.js
// self refers to the global object in the browser
self.onmessage = function(event) {
// onmessage = function(event) {

	console.log("parallel_processing.js - event.data.type: ", event.data.type);
	console.log("parallel_processing.js - event.data.data: ", event.data.data);
	console.log("parallel_processing.js - event: ", event);

	
	function modify_canvas_data(normalArray) {
		
		// Modify some of the pixels, to determine if there is a change
		const color_name = ['r', 'g', 'b', 'alpha'];
		for ( let i=0; i<normalArray.length; i+=color_name.length ) {
			if ( i > normalArray.length/2 && i % 2 == 0) {
				normalArray[i] = 255;
				normalArray[i+1] = 255;
				normalArray[i+2] = 255;
			}
		}
		return new Uint8ClampedArray(normalArray);
	}

	
	
	if (event.data.type == 'process') {
		// Modify the canvas image data 
		const Typedarray = modify_canvas_data(event.data.data);
		console.log('parallel_processing.js - Typedarray: ', Typedarray);

		// Send processed data back to main thread
		self.postMessage(Typedarray);
		// postMessage(Typedarray);
	}
}
