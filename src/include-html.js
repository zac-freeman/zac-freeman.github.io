function loadHTML() {
	let elements = document.getElementsByTagName("div");

	for (let element of elements) {
		let source = element.getAttribute("include-html");

		if (source) {
			// Make an HTTP request using the attribute value as the file name
			let xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4) {
					if (this.status == 200) {element.innerHTML = this.responseText;}
					if (this.status == 404) {element.innerHTML = "Page not found.";}
				}
			}
			xhttp.open("GET", source, true);
			xhttp.send();
		}
	}
}

function unloadHTML() {
	//TODO
}