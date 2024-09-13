// Initialise

(function () {
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
		editBtn = document.getElementById(ID.EDIT_BUTTON);
		shareBtn = document.getElementById(ID.SHARE_BUTTON);

		// On-Display Control Bar
		onDisplayControlBar = document.getElementById(ID.ON_DISPLAY_CONTROL_BAR);
		showBtn = document.getElementById(ID.SHOW_BUTTON);

		// Sharing Dialogue
		shareDialogue = document.getElementById(ID.SHARE_DIALOGUE);

		// Editing Dialogue
		editDialogue = document.getElementById(ID.EDIT_DIALOGUE);

	// Set Properties and Functions

		// Display
		let touchEnd = function(){
			touchingTime = 0;
			clearInterval(touchInterval);
		};

		let touchStart = function(){
			if(!touchInterval){
				touchInterval = setInterval(() => {
					touchingTime++;

					if(touchingTime >= 15){
						takesScreenshot(void 0, void 0, void 0, true);
						touchEnd();
					}
				}, 100);
			}
		};

		display.addEventListener("mousedown", touchStart);
		display.addEventListener("mouseup", touchEnd);
		display.addEventListener("touchstart", touchStart);
		display.addEventListener("touchend", touchEnd);

		//Control Bar
		hideBtn.addEventListener("click", function (event) {
			controlBar.classList.add("hide");
			controlBar.classList.remove("show");
		});

		expandBtn.addEventListener("click", function(event){
			makeFullscreen(void 0, true);
		});

		shrinkBtn.addEventListener("click", function(event){
			makeFullscreen(void 0, false);
		});

		if (document.fullscreenElement == null) {
			shrinkBtn.style.display = "none";
		} else {
			expandBtn.style.display = "none";
		}

		editBtn.style.display = "none";
		editBtn.addEventListener("click", function(event){
			editDialogue.showModal();
		});

		shareBtn.addEventListener("click", async function(event){
			let ss = await takesScreenshot(display);
			ss.toBlob(blob => {
				let url = URL.createObjectURL(blob);
				document.getElementById("preview").src = url;

				shareDialogue.showModal();
			});
		});

		document.getElementById("btn-reset").addEventListener("click", function(event){
			saveRefPoint(new Date());
			
			initialiseTimer();
		});

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

		// Editing Dialogue
		editDialogue.addEventListener("click", function(event){
			editDialogue.close();
		});

		editDialogue.children[0].addEventListener("click", function(event){
			event.stopPropagation();
		});

		// Sharing Dialogue
		shareDialogue.addEventListener("click", function(event){
			shareDialogue.close();
		});

		shareDialogue.children[0].addEventListener("click", function(event){
			event.stopPropagation();
		});

		let sizeBtns = document.getElementsByClassName("btn-size");
		for(sizeBtn of sizeBtns){
			sizeBtn.addEventListener("click", async function(event){
				let label = event.target.innerText;
				let isCurrent = label == "current";

				let width = isCurrent ? void 0 : Number(label.split(" × ")[0]) , height = isCurrent ? void 0 : Number(label.split(" × ")[1]) ;

				let canvas = await takesScreenshot(display, width, height);
				canvas.toBlob(blob => {
					let url = URL.createObjectURL(blob);
					document.getElementById("preview").src = url;
				});
			});
		}

		document.getElementById("share-download").addEventListener("click", function(event){
			let now = new Date();
			let filename = "screenshot_" + [
				fillChars(String(now.getFullYear()), 4, "0"),
				fillChars(String(now.getMonth() + 1), 2, "0"),
				fillChars(String(now.getDate()), 2, "0"),
				fillChars(String(now.getHours()), 2, "0"),
				fillChars(String(now.getMinutes()), 2, "0"),
				fillChars(String(now.getSeconds()), 2, "0"),
				fillChars(String(now.getMilliseconds()), 3, "0"),
			].join("") + ".png";

			downloadByURL(document.getElementById("preview").src, filename);
		});

	// Other Functions
	document.addEventListener("fullscreenchange", function (event) {
		expandBtn.style.display = this.fullscreenElement ? "none" : "initial";
		shrinkBtn.style.display = this.fullscreenElement ? "initial" : "none";
	});

	// Initialise
	applyTheme(themeHue);
	initialiseTimer();

	// Remove Splash Screen
	setTimeout(function(){
		document.getElementById("splash").remove();
	}, 3000);
})();