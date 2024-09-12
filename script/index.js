// Initialise

(function () {
	// Get Elements

		// Display
		display = document.getElementById(ID.DISPLAY);

		topPane = document.getElementById(ID.TOP_PANE);
		middlePane = document.getElementById(ID.MIDDLE_PANE);
		bottomPane = document.getElementById(ID.BOTTOM_PANE);

		showDiff = document.getElementById(ID.SHOW_DIFF);

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
				event.target.classList.add("show");
				event.target.classList.remove("hide");
			}
		});
	
		onDisplayControlBar.addEventListener("mouseout", function (event) {
			event.target.classList.add("hide");
			event.target.classList.remove("show");
		});

		showBtn.addEventListener("click", function (event) {
			controlBar.classList.add("show");
			controlBar.classList.remove("hide");
		});


	// Other Functions

	document.addEventListener("fullscreenchange", function (event) {
		expandBtn.style.display = this.fullscreenElement ? "none" : "initial";
		shrinkBtn.style.display = this.fullscreenElement ? "initial" : "none";
	});

	// Initialise

	document.getElementById(ID.TITLE_BAR).innerText = document.title;
	initialiseTimer();
})();