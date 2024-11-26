// self refers to the global object in the browser
self.onmessage = function(event) {
	
	console.log("retrieve_image.js - event.data.data: ", event.data.data);
	console.log("retrieve_image.js - event: ", event);  	// [object MessageEvent]


	// event.data.data
	var url = "https://storage.googleapis.com/on-the-way2selfrespect/yellow.png";


	// Determine request method
	var headers = {
		"Content-Type": "application/json",
		"Referer": url,
		"Origin": "https://codesolutions2.github.io",
		"Connection": "keep-alive",
		"User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0",
		"Access-Control-Allow-Origin": "*"
	};
	
	var options = { 
		method : "GET",
		mode: 'cors',
		headers: new Headers(headers),
		cache: "no-cache",
		crossorigin: 'anonymous',
		redirect: "follow"
	};
	
	// Fetch data
	fetch(url, options)
		.then(response => response.arrayBuffer())
		.then(function(arraybuffer) {
			console.log("arraybuffer: ", arraybuffer);
			
			// Send processed data back to main thread
			self.postMessage(arraybuffer);
		})
		.catch(error => console.error("error: ", error));
	

	// OR
	
	fetch(url, options)
		.then(response => response.blob())
		.then(function(blob) {
			const url = URL.createObjectURL(blob);
			console.log("arraybuffer: ", arraybuffer);

			self.postMessage(url);
		})
		.catch(error => console.error("error: ", error));
		


}
