// Initialise

(function () {
	// Theme
	let colours = hueToThemeColours(themeHue);

	// Get Elements

		// Display
		display = document.getElementById(ID.DISPLAY);

		topPane = document.getElementById(ID.TOP_PANE);
		middlePane = document.getElementById(ID.MIDDLE_PANE);
		bottomPane = document.getElementById(ID.BOTTOM_PANE);

		showStart = document.getElementById(ID.SHOW_START);
		showDiff = document.getElementById(ID.SHOW_DIFF);
		showEnd = document.getElementById(ID.SHOW_END);

		// Control Bar
		controlBar = document.getElementById(ID.CONTROL_BAR);
		hideBtn = document.getElementById(ID.HIDE_BUTTON);
		expandBtn = document.getElementById(ID.EXPAND_BUTTON);
		shrinkBtn = document.getElementById(ID.SHRINK_BUTTON);

		// On-Display Control Bar
		onDisplayControlBar = document.getElementById(ID.ON_DISPLAY_CONTROL_BAR);
		showBtn = document.getElementById(ID.SHOW_BUTTON);

	// Set Properties and Functions

		// Display

		//Control Bar
		controlBar.style.background = colours.PrimaryLight;

		hideBtn.addEventListener("click", function (event) {
			controlBar.classList.add("hide");
			controlBar.classList.remove("show");
		});

		expandBtn.addEventListener("click", function(event){
			makeFullscreen(document.documentElement, true);
		});

		shrinkBtn.addEventListener("click", function(event){
			makeFullscreen(document.documentElement, false);
		});

		if (document.fullscreenElement == null) {
			shrinkBtn.style.display = "none";
		} else {
			expandBtn.style.display = "none";
		}

		// On-Display Control Bar
		onDisplayControlBar.addEventListener("mouseover", function (event) {
			if (controlBar.classList.contains("hide")) {
				onDisplayControlBar.classList.add("show");
				onDisplayControlBar.classList.remove("hide");
			}
		});
	
		onDisplayControlBar.addEventListener("mouseout", function (event) {
			onDisplayControlBar.classList.add("hide");
			onDisplayControlBar.classList.remove("show");
		});

		showBtn.addEventListener("click", function (event) {
			controlBar.classList.add("show");
			controlBar.classList.remove("hide");
		});

		for(child of onDisplayControlBar.children){
			if(child.tagName.toLowerCase() == "svg") for(_child of child.children) if(_child.tagName.toLowerCase() == "path"){
				_child.style.fill = colours.Primary;
			}
		}


	// Other Functions

	document.addEventListener("fullscreenchange", function (event) {
		expandBtn.style.display = this.fullscreenElement ? "none" : "initial";
		shrinkBtn.style.display = this.fullscreenElement ? "initial" : "none";
	});

	// Initialise
	document.getElementById(ID.TITLE_BAR).innerHTML = `Time <span style='color: ${colours.Primary}'>D</span>iff`;
	initialiseTimer();
})();