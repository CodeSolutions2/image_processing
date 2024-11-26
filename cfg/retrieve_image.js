// self refers to the global object in the browser
self.onmessage = function(event) {
	// console.log("retrieve_image.js - event.data.type: ", event.data.type);  	// process
	// console.log("retrieve_image.js - event.data.data: ", event.data.data);	// Typedarray
	console.log("retrieve_image.js - event: ", event);  	// [object MessageEvent]


	// event.data.data
	var url = "https://storage.googleapis.com/on-the-way2selfrespect/yellow.png";
	
	if (event.data.type == 'process') {

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
		const arraybuffer = fetch(url, options)
				.then(response => response.arrayBuffer())
				.then(async function(arraybuffer) { return arraybuffer; })
				.catch(error => console.error("error: ", error));
		console.log("arraybuffer: ", arraybuffer);
		

		// Send processed data back to main thread
		self.postMessage(arraybuffer);
	}

}
