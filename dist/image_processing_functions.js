export {create_dynamic_canvasElement, create_a_solid_image, convert_canvas_into_ImageData, modify_canvas_data}


// -------------------------------------------------
// IMAGE SUBFUNCTIONS
// -------------------------------------------------
async function create_dynamic_canvasElement(canvasElement_id, canvasElement_className) {
	
	const index = 0;
  
	// Create a canvas element
	var canvasElement = document.createElement('canvas');

	// Set attributes of the canvas
	canvasElement.width = width;
	canvasElement.height = height;
  	canvasElement.id = canvasElement_id;
	canvasElement.class = canvasElement_className;
	
	// Get the 2D rendering context of the canvas
	var ctx = canvasElement.getContext("2d");

		if (index == 0) {
			canvasElement.style.left = 40+'px';
		} else {
			let tot = index*canvasElement.width + 40;
			canvasElement.style.left = tot+'px';
		}

	return [ctx, canvasElement];
}

// -------------------------------------------------
	
async function create_a_solid_image(ctx) {
	
	var r = Math.floor(Math.random()*255);
	var g = Math.floor(Math.random()*255);
  	var b = Math.floor(Math.random()*255);
  	const alpha = Math.floor(Math.random()*100);
  
  	// ----------------------
  
  	// Make r, g, b and interesting color range.
	// Make r from 1 to 255 if r>1, then output=r else output=1
	r = r>0 ? r : 1;
	g = g>0 ? g : 1;
	b = b>0 ? b : 1;

	// ----------------------
	
	ctx.fillStyle = `rgb(${r} ${g} ${b} / ${alpha}%)`;
	ctx.fillRect(0, 0, width, height);
}

// -------------------------------------------------

async function convert_canvas_into_ImageData(ctx) {
	
	// Get canvas image
	const uint8ClampedArray = await ctx.getImageData(0, 0, width, height); // TypedArray  Uint8ClampedArray
	// console.log('uint8ClampedArray: ', uint8ClampedArray);
  
	// Convert TypedArray to normalArray
	return normalArray = await Array.from(uint8ClampedArray.data);
}

// -------------------------------------------------

async function modify_canvas_data(normalArray) {

	// Modify some of the pixels, to determine if there is a change
	const color_name = ['r', 'g', 'b', 'alpha'];
	for ( let i=0; i<normalArray.length; i+=color_name.length ) {
		if ( i > normalArray.length/2 && i % 2 == 0) {
			normalArray[i] = 255;
			normalArray[i+1] = 255;
			normalArray[i+2] = 255;
		}
	}

	return await new Uint8ClampedArray(normalArray);
}
	
// -------------------------------------------------
