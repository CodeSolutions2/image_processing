export {create_dynamic_canvasElement, create_a_solid_image, convert_canvas_into_ImageData, modify_canvas_data}


// -------------------------------------------------
// IMAGE SUBFUNCTIONS
// -------------------------------------------------
async function create_dynamic_canvasElement(canvasElement_id, canvasElement_className) {
  
	// Create a canvas element
	var canvasElement = document.createElement('canvas');

	// Set attributes of the canvas
	canvasElement.width = width;
	canvasElement.height = height;
  	canvasElement.id = canvasElement_id;
	canvasElement.class = canvasElement_className;
	
	// Get the 2D rendering context of the canvas
	var ctx = canvasElement.getContext("2d");

	// -------------------------

	// (Optional) Parameter to put canvas next to each other
	const canvas_number = 0;
	if (canvas_number == 0) {
		canvasElement.style.left = 40+'px';
	} else {
		// Append a canvas to the right of an existing canvas
		let tot = canvas_number*canvasElement.width + 40;
		canvasElement.style.left = tot+'px';
	}

	// -------------------------

	// Make a canvas border
	canvasElement.style.border = '1px solid black';

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

async function convert_canvas_to_base64str(ctx, canvasElement) {
	
	// -----------------------------
	
	// Get canvas image
	const uint8ClampedArray = await ctx.getImageData(0, 0, canvasElement.width, canvasElement.height); // TypedArray  Uint8ClampedArray
	// console.log('uint8ClampedArray: ', uint8ClampedArray);

	// Convert TypedArray to normalArray
	const normalArray = await Array.from(uint8ClampedArray.data);
	// console.log('normalArray: ', normalArray);
	
	// Convert [normalArray of bytes] to text_characters
	var ASCII_stringArray = normalArray.map((val) => { return String.fromCharCode(val); });
	// console.log('ASCII_stringArray: ', ASCII_stringArray);
	
	// Join all the ASCII characters to form a string
	var ASCII_str = ASCII_stringArray.join('');
	// console.log("ASCII_str: ", ASCII_str);
	
	// Transform ASCII string into a base64 string
	var base64_string = btoa(ASCII_str);
	// console.log("base64_string: ", base64_string);

	// -----------------------------

	return [ASCII_str, base64_string];
}

// -------------------------------------------------

async function resize() {

	// Use src, resize canvas, make new image

	// [0] get copy of original canvas image
	var url = document.getElementById("canvasElement_id").toDataURL('image/png');  // WORKS
	console.log('url: ', url);
		
	// [1] define resizing parameters
	const width_NEW = document.getElementById("width_NEW").value;
	const height_NEW = document.getElementById("height_NEW").value;
	
	var sx = 0; // for cropping the image: distance from the [original left edge of the image] to the [deisred left edge of image]
	var sy = 0; // for cropping the image: distance from the [original top edge of the image] to the [deisred top edge of image]
	var image_width = width_NEW; // for cropping the image: desired image width
	var image_height = height_NEW; // for cropping the image: desired image height
	var dx = 0;  // location to place image on canvas: distance from the [left edge of the canvas] to the [left edge of image]
	var dy = 0;  // location to place image on canvas: distance from the [top edge of the canvas] to the [top edge of image]
	var dWidth = width_NEW; // for resizing the image on the canvas: desired image width on canvas
	var dHeight = height_NEW; // for resizing the image on the canvas: desired image width on canvas

	const image = new Image();
	image.crossOrigin = "anonymous";
	image.onload = async () => {

		// [2] resize canvas
		canvasElement.width = width_NEW;
		canvasElement.height = height_NEW;

		// [3] put the image back onto the canvas at the new size using image.src and defining the new size
		ctx.drawImage(image, sx, sy, image_width, image_height, dx, dy, dWidth, dHeight); // only image, sx, sy, image_width, image_height need to be set
	};
	image.src = url;
	
}
// -------------------------------------------------
  
async function check_if_canvas_is_filled() {
	
	// Get canvas image
	const uint8ClampedArray = await ctx.getImageData(0, 0, canvasElement.width, canvasElement.height); // TypedArray  Uint8ClampedArray
	// console.log('uint8ClampedArray: ', uint8ClampedArray);
  
	// Convert TypedArray to normalArray
	var normalArray = await Array.from(uint8ClampedArray.data);

	// ----------------------
	
	// A blank canvas has rgb values that are zero.
	// Modify some of the pixels, to determine if there is a change
	const color_name = ['r', 'g', 'b', 'alpha'];
	var r_sum = 0;
	var g_sum = 0;
	var b_sum = 0;
	for ( let i=0; i<normalArray.length; i+=color_name.length ) {
		r_sum = r_sum + normalArray[i];
		g_sum = g_sum + normalArray[i+1];
		b_sum = b_sum + normalArray[i+2];
	}
	console.log("r_sum: ", r_sum);
	console.log("g_sum: ", g_sum);
	console.log("b_sum: ", b_sum);
	var result0 = (r_sum + g_sum + b_sum) == 0 ? 'blank' : 'filled';
	console.log("result0: ", result0);

	// OR

	var result_arr = normalArray.map((val, ind) => {
		if (val != 0) {
			return 'filled';
		} else {
			return '';
		}
	}).filter((x) => x.length != 0);
	console.log("result_arr: ", result_arr);

	var result1 = result_arr.length == 0 ? 'blank' : 'filled';
	console.log("result1: ", result1);

	// ----------------------

	// Outputs "filled" if there is an image on the canvas, outputs "blank" if the canvas is empty.
  	return result0;
}

// -------------------------------------------------

// -------------------------------------------------

// -------------------------------------------------

// -------------------------------------------------
