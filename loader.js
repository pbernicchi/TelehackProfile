///////////////////////////////
// CONFIG
// Constants defining the configuration.

// The path to the page's CSS file.
// TODO: Dynamically create the URL, relative to this JS file.
	var PATH_CSSFile = "https://pbernicchi.github.io/TelehackProfile/pbernicc.css";

///////////////////////////////
// LOAD STYLESHEET

	var objLinkElement = document.createElement("link");
	objLinkElement.setAttribute("rel", "stylesheet");
	objLinkElement.setAttribute("type", "text/css");
	objLinkElement.setAttribute("href", PATH_CSSFile);

	document.getElementsByTagName("head")[0].appendChild(objLinkElement);

///////////////////////////////
// FUNCTIONAL CODE

	var MIN_Contrast = 1;
	var MAX_Contrast = 12;

	var Contrast = 1;

	function ContrastDown() {
		AdjustContrast(-1);
		return false;
	}

	function ContrastUp() {
		AdjustContrast(1);
		return false;
	}

	function AdjustContrast(Amount) {
		Contrast = Contrast + Amount;

		if (Contrast < MIN_Contrast)
			Contrast = MIN_Contrast;
		if (Contrast > MAX_Contrast)
			Contrast = MAX_Contrast;

		var Body = document.getElementsByTagName("body")[0];
		if (Body.className.indexOf("Contrast") != -1) {
			Body.className = Body.className.replace(/ Contrast\d+/, "");
		}

		Body.className += " Contrast" + Contrast;
		console.log(Contrast, Body.className);
	}

	var objElement;

	objElement = document.createElement('div');
	objElement.id = "ScreenShine";
	document.getElementsByTagName("body")[0].appendChild(objElement);

	objElement = document.createElement('div');
	objElement.id = "ContrastDown";
	objElement.onclick = ContrastDown;
	document.getElementsByTagName("body")[0].appendChild(objElement);

	objElement = document.createElement('div');
	objElement.id = "ContrastUp";
	objElement.onclick = ContrastUp;
	document.getElementsByTagName("body")[0].appendChild(objElement);
