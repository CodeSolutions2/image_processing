<DOCTYPE>
<html>
<head></head>
<body>

<div class="column_container">
  <input id="input0" type="text" placeholder="[Step 0] enter url" />
</div>

<div class="row_container">
  <div class="div_simple" id="div0" data="" onclick="step0_show_image()"></div>
  <button class="button_simple" id="btn0" onclick="xhr()"></button>
  <img id="img0" />
</div>

<div id="output"></div>

<style>
#input0 {
  border-radius: 5px;
}

.column_container {
  display: flex;
  flex-direction: column;
}

.button_simple {
  width: 100px;
  height:100px;
  background-color: seagreen;
  border-radius: 5px;
}

.button_simple:hover {
  background-color: color-mix(in srgb, red 50%, white 50%);
}


#btn0:before {
  content: "[Step 2] show reconstructed image";
}

.row_container {
  display: flex;
  flex-direction: row;
}

.div_simple {
  width: 100px;
  height:100px;
  border: 1px solid gray;
  border-radius: 5px; 
  background-color: white;
  background-size: 100px;
}

#div0:before {
  font-size: 8px;
  content: "[Step 1] show original image: "attr(data);
}

#img0 {
  width: 100px;
  height:100px;
  border: 1px solid gray;
  border-radius: 5px; 
  background-color: white;
  background-size: 100px;
}
</style>

<script>

function step0_show_image() {
  
  var url = document.getElementById("input0").value;
  
  // Show image.
  document.getElementById("div0").setAttribute("style", "background-image: url("+url+");");

  // Show text.
  document.getElementById("div0").setAttribute("data", url);
 
}

// -------------------------

async function xhr() {

  var url = document.getElementById("input0").value;

  var xhr = new XMLHttpRequest();

  xhr.open( "GET", url, true );

  xhr.responseType = "arraybuffer";

  xhr.onload = await function(event) {

    var arrayBuffer = this.response; // ArraybufferView

    // document.getElementById("output").innerHTML += "arrayBuffer: "+arrayBuffer+"<br>";

    var TypedArray = new Uint8Array(arrayBuffer);
    // document.getElementById("output").innerHTML += "TypedArray: "+TypedArray.slice(0,10)+"<br>";
   
    // ---------
    
    var normalArray = Array.from(TypedArray);

    var binaryString = convert_utf8Array_to_textStr(normalArray);
    // document.getElementById("output").innerHTML += "binaryString: "+binaryString.slice(0,10)+"<br>";

    var binaryString_base64 = btoa(binaryString);
    document.getElementById("output").innerHTML += "binaryString_base64: "+binaryString_base64+"<br>";
    
    var binaryString = atob(binaryString_base64);
    // document.getElementById("output").innerHTML += "binaryString: "+binaryString.slice(0,10)+"<br>";

    var TypedArray1 = binaryStringArraybuffer_to_ArrayBuffer(binaryString);
    // document.getElementById("output").innerHTML += "TypedArray1: "+TypedArray1.slice(0,10)+"<br>";
    
    // ---------

    var blob_object = new Blob( [TypedArray1], { type: "image/jpeg" } );
   
    document.getElementById("img0").src = URL.createObjectURL(blob_object);
  };

  xhr.send();

}


// -------------------------
// Subfunctions
// -------------------------
function binaryStringArraybuffer_to_ArrayBuffer(binaryString) {

  var method = 1;

  if (method == 0) {
    var char_array = binaryString.split("");
    var byteArray = char_array.map((v,i) => { return v.charCodeAt(0); });
    var TypedArray = new Uint8Array(byteArray);
 
  } else if (method == 1) {
    var byteArray = new Uint8Array(binaryString.length);
    for (var i=0; i<binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
    }
    var TypedArray = byteArray;
  }

  // Possible outputs.
  // [0]
  // var normalArray = await Array.from(TypedArray);

  // [1]
  // TypedArray

  // [2]
  // var arrayBuffer = byteArray.buffer;

  return TypedArray;

} // end of function



function convert_utf8Array_to_textStr(normalArray) {

 // Convert [normalArray of bytes] to text_str.
 var ASCII_stringArray = normalArray.map((val) => { return String.fromCharCode(val); });
 
 // Join all the ASCII characters to form a text_string
 return ASCII_stringArray.join('');
 
}



</script>
</body>
</html>
