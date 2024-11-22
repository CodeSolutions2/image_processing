// draw_image_w_ParallelProcessing.js

const canvasElement = document.querySelector('.canvasElement_className');


// self refers to the global object in the browser
self.onmessage = function(event) {

	console.log("draw_image_w_ParallelProcessing.js - event.data.type: ", event.data.type);  	// process
	console.log("draw_image_w_ParallelProcessing.js - event.data.data: ", event.data.data);	// Typedarray
	console.log("draw_image_w_ParallelProcessing.js - event: ", event);  	// [object MessageEvent]
	
	if (event.data.type == 'process') {
		
    // Need to put the Typedarray on to the existing canvas from index.html

    // Draw parallel processed data on canvas
		const imageData = new ImageData(event.data.data, canvasElement.width, canvasElement.height);
		canvasElement.getContext("2d").putImageData(imageData, 0, 0);

		// Send processed data back to main thread
		self.postMessage("Modification Drawn on Canvas: DONE");
	}
}
