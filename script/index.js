var ref_point;
var interval;
var show_days = false;

var expansionBtn;
var shrinkBtn;

function saveRefPoint(date) {
	localStorage.setItem(ITEMID_REF, date.toString());
	initialiseTimer();
}

function loadRefPoint() {
	return localStorage.getItem(ITEMID_REF);
}

function syncTheTime() {
	let display = document.getElementById(ID_DISPLAY);

	let now = new Date();
	let diff = now - ref_point;

	display.innerHTML = timeToText(diff);
}

function initialiseTimer() {
	clearInterval(interval);

	let ref = loadRefPoint();
	ref_point = ref == null ? new Date() : new Date(ref);
	if (ref == null) {
		saveRefPoint(ref_point);
	}

	inteval = setInterval(syncTheTime, 500);
}

function toggleShowingDays() {
	show_days = !show_days; b
}

(function(){
	let titleAnchor = document.getElementById("anchor-title");
	titleAnchor.addEventListener("click", function(event){
		location.reload(true);
	});

	expansionBtn = document.getElementById("btn-expansion");
	expansionBtn.addEventListener("click", function(){
		document.documentElement.requestFullscreen({navigationUI: "show"})
		.then(() => {})
		.catch(err => {
			console.log(err);
		});
	});

	shrinkBtn = document.getElementById("btn-shrink");
	shrinkBtn.addEventListener("click", function(event){
		document.exitFullscreen();
	});

	if(document.fullscreenElement == null){
		shrinkBtn.style.display = "none";
	}else{
		expansionBtn.style.display = "none";
	}

	document.addEventListener("fullscreenchange", function(event){
		expansionBtn.style.display = this.fullscreenElement ? "none" : "initial";
		shrinkBtn.style.display = this.fullscreenElement ? "initial" : "none";
	});

	let screenshotBtn = document.getElementById("btn-screenshot");
	screenshotBtn.addEventListener("click", function(event){
		takesScreenshot(1920, 1080);
	})

	let screenshotBtn2 = document.getElementById("btn-screenshot2");
	screenshotBtn2.addEventListener("click", function(event){
		takesScreenshot(1080, 1920);
	});

	document.getElementById(ID_TITLEBAR).innerText = document.title;
	initialiseTimer();
})();