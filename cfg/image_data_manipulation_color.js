// image_data_manipulation_color.js
// self refers to the global object in the browser
self.onmessage = function(event) {

	// console.log("image_data_manipulation_color.js - event.data.type: ", event.data.type);  	// process
	// console.log("image_data_manipulation_color.js - event.data.data: ", event.data.data);	// Array(262144) [ 64, 190, 83, 138, 64, 190, 83, 138, 64, 190,  ]
	// console.log("image_data_manipulation_color.js - event: ", event);  	// [object MessageEvent]

	
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
	}
}
