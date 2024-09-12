const KEY_REF = "referencepoint";

// Element IDs
const ID_DISPLAY = "display";
const ID_TITLEBAR = "title";

const ID = {
	// Display
	DISPLAY: "display",

	TOP_PANE: "top-pane",
	MIDDLE_PANE: "middle-pnae",
	BOTTOM_PANE: "bottom-pane",

	SHOW_DIFF: "show-diff",

	// Control Bar
	CONTROL_BAR: "controlbar",

	TITLE_BAR: "title",

	HIDE_BUTTON: "btn-hide",
	EXPAND_BUTTON: "btn-expand",
	SHRINK_BUTTON: "btn-shrink",

	// On-Display Control Bar
	ON_DISPLAY_CONTROL_BAR: "ondisplay-controlbar",
	SHOW_BUTTON: "btn-show",
};

// Flag etc. 
var ref_point;
var interval;
var show_days = false;

// Display
var display;

var topPane;
var middlePane;
var bottomPane;

var showDiff;

// Control Bar
var controlBar;
var hideBtn;
var expandBtn;
var shrinkBtn;

// On-Display Control Bar
var onDisplayControlBar;
var showBtn;

// Functions
function saveRefPoint(date) {
	localStorage.setItem(KEY_REF, date.toString());
	initialiseTimer();
}

function loadRefPoint() {
	return localStorage.getItem(KEY_REF);
}

function syncTheTime() {
	let now = new Date();
	let diff = now - ref_point;

	showDiff.innerHTML = timeToText(diff);
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