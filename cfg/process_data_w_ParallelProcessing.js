// process_data_w_ParallelProcessing.js
// self refers to the global object in the browser
self.onmessage = function(event) {
// onmessage = function(event) {

	// console.log("process_data_w_ParallelProcessing.js - event.data.type: ", event.data.type);  	// process
	// console.log("process_data_w_ParallelProcessing.js - event.data.data: ", event.data.data);	// Array(262144) [ 64, 190, 83, 138, 64, 190, 83, 138, 64, 190,  ]
	// console.log("process_data_w_ParallelProcessing.js - event: ", event);  	// [object MessageEvent]

	
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

		// Send processed data back to main thread
		self.postMessage(Typedarray);
		// postMessage(Typedarray);
	}
}
