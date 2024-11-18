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

async function convert_canvas_to_base64str() {

	// -----------------------------

	// Put image on a canvas
	await gradient();

	// -----------------------------
	
	// Get canvas image
	const uint8ClampedArray = await ctx.getImageData(0, 0, width, height); // TypedArray  Uint8ClampedArray
	console.log('uint8ClampedArray: ', uint8ClampedArray);

	// Convert TypedArray to normalArray
	const normalArray = await Array.from(uint8ClampedArray.data);
	console.log('normalArray: ', normalArray);
	// length normalArray:  262144
	
	// Convert [normalArray of bytes] to text_characters
	var ASCII_stringArray = normalArray.map((val) => { return String.fromCharCode(val); });
	console.log('ASCII_stringArray: ', ASCII_stringArray);
	// length 262144
	
	// Join all the ASCII characters to form a string
	var ASCII_str = ASCII_stringArray.join('');
	console.log("ASCII_str: ", ASCII_str);
	
	// Put header on base64_string (optional)
	
		
	// Transform ASCII string into a base64 string
	var base64_string = btoa(ASCII_str);
	console.log("base64_string: ", base64_string);

	// -----------------------------

	// -----------------------------
	// Put the base64string onto another canvas to confirm that it is correct, and can be reconstructed
	// -----------------------------
	var ASCII_str = atob(base64_string);
	console.log("base64_string: ", base64_string);
	
	// Transform base64_string into Typed array
	var character_array = ASCII_str.split('');
	console.log("character_array: ", character_array);
	// Array(38190) [ "�", "�", "�", "d", "\u0000", "\u0000", "\u0000", "\u0000", "\u0000", "\u0000", … ]
	// length = 349528
			
	// Map each [binary string character; a subset of binary string characters is UTF-8] as an [ASCII number; a number from 0 to number_of_characters]
	var byteArray = character_array.map((character) => { return character.charCodeAt(0); });
	console.log("byteArray: ", byteArray);
	
	// The importance of this mapping is to limit the array values from 0 to 255.
	const uint8_typedarray = await new Uint8ClampedArray(byteArray);
	console.log('uint8_typedarray: ', uint8_typedarray);
	
	let imageData = await new ImageData(uint8_typedarray, width, height);
	document.getElementById("canvas_img_r").style.left = Number(1*(width + 40)).toString() + 'px';
	ctx1.putImageData(imageData, 0, 0);
}

// -------------------------------------------------

// -------------------------------------------------

// -------------------------------------------------

// -------------------------------------------------

// -------------------------------------------------
