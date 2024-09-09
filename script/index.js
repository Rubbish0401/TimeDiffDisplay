const Unit = {
	MILLI_SECOND: 1,
	SECOND: 1000,
	MINUTE: 60 * 1000,
	HOUR: 60 * 60 * 1000,
	DAY: 24 * 60 * 60 * 1000,
	WEEK: 7 * 24 * 60 * 60 * 1000,
	MONTH: 30 * 24 * 60 * 60 * 1000, // 30 days
	YEAR: 365 * 24 * 60 * 60 * 1000
};

const ITEMID_REF = "referencepoint";
const ID_DISPLAY = "display";
const ID_TITLEBAR = "title";

var ref_point;
var interval;
var show_days = false;

var expansionBtn;
var shrinkBtn;

function fillChars(text = "", length = 0, char = "0", direction = 0) {
	text = text.toString();

	let filler = "";
	for (let i = 0; i < Math.max(0, length - text.length); i++) filler += char;

	return (direction == 0 ? filler : "") + text + (direction == 1 ? filler : "");
}

function timeToText(milliseconds) {
	let d_seconds = milliseconds % Unit.MINUTE;
	let d_minutes = (milliseconds - d_seconds) % Unit.HOUR;
	let d_hours = (milliseconds - d_seconds - d_minutes) % Unit.DAY;
	let d_days = (milliseconds - d_seconds - d_minutes - d_hours);

	let t_seconds = `${fillChars(Math.floor(d_seconds / Unit.SECOND), 2, "0")}<span class="small-font">s</span>`;
	let t_minutes = `${fillChars(d_minutes / Unit.MINUTE, 2, "0")}<span class="small-font">m</span>`;
	let t_hours = `${fillChars(d_hours / Unit.HOUR, 2, "0")}<span class="small-font">h</span>`;
	let t_days = `${fillChars(d_days / Unit.DAY, 3, "0")}<span class="small-font">day<span style="opacity: ${d_days / Unit.DAY > 1 ? 1 : 0}">s</span></span>`;

	return (show_days ? t_days : "") + `${t_hours}${t_minutes}${t_seconds}`;
}



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
	show_days = !show_days;
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

		expansionBtn.style.display = "none";
		shrinkBtn.style.display = "initial";
	});

	shrinkBtn = document.getElementById("btn-shrink");
	shrinkBtn.addEventListener("click", function(event){
		document.exitFullscreen();

		expansionBtn.style.display = "initial";
		shrinkBtn.style.display = "none";
	});

	if(document.fullscreenElement == null){
		shrinkBtn.style.display = "none";
	}else{
		expansionBtn.style.display = "none";
	}

	let screenshotBtn = document.getElementById("btn-screenshot");
	screenshotBtn.addEventListener("click", function(event){
		html2canvas(document.body,	{
			windowWidth: 1920,
			windowHeight: 1080
		}).then(canvas => {
			let now = new Date();

			let anchor = document.createElement("a");
			anchor.href = canvas.toDataURL("image/png");
			anchor.download = `screenshot_${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}.png`;
			anchor.click();
		});
	})

	let screenshotBtn2 = document.getElementById("btn-screenshot2");
	screenshotBtn2.addEventListener("click", function(event){
		html2canvas(document.body,	{
			windowWidth: 1080,
			windowHeight: 1920
		}).then(canvas => {
			let now = new Date();

			let anchor = document.createElement("a");
			anchor.href = canvas.toDataURL("image/png");
			anchor.download = `screenshot_${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}.png`;
			anchor.click();
		});
	})

	document.getElementById(ID_TITLEBAR).innerText = document.title;
	initialiseTimer();
})();