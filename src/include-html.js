// loadHTML(): For each <div> containing an attribute of the form `include-html = "path/to/content"`,
//             set innerHTML of said <div> with content at path,
//             and execute javascript contained within <script> tags.
//
// TODO: run scripts contained within new innerHTML content when it is loaded
//       filter out all comments and debug statements from code before it is loaded, to optimize download times
function loadHTML() {
	let elements = document.getElementsByTagName("div");

	for (let element of elements) {
		let source = element.getAttribute("include-html");

		if (source) {
			// Make an HTTP request using the attribute value as the file name
			let xhr = new XMLHttpRequest();

			xhr.onreadystatechange = function() {
				if (this.readyState == 4) {
					if (this.status == 200) {
						element.innerHTML = this.responseText;

						loadScripts([...element.getElementsByTagName("script")]);
					}
					if (this.status == 404) {
						element.innerHTML = "Not found.";
					}
				}
			}
			xhr.open("GET", source, true);
			xhr.send();
		}
	}
}

function loadScripts(scripts) {
	scripts.forEach(script => {
		loadScript(script);
	})
}

// loadScript(HTMLScriptElement script): For each script, create a new XMLHttpRequest and eval the response.
//                                       Async calls to the same xhr object show unexpected behavior.
function loadScript(script) {
	let xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() {
		if (this.readyState == 4) {
			if (this.status == 200) {
				eval(this.responseText)
			}
		}
	}

	xhr.open("GET", script.src, true);
	xhr.send();
}

function unloadHTML() {
	//TODO
}