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

	SHOW_START: "show-start",
	SHOW_DIFF: "show-diff",
	SHOW_END: "show-end",

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

// Variables
var ref_point;
var interval;
var show_days = false;

var themeHue = 0; // 0 to 255 int

var touchInterval;
var touchingTime = 0;

// Display
var display;

var topPane;
var middlePane;
var bottomPane;

var showStart;
var showDiff;
var showEnd;

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
	let obj = {
		refPoint: date.toString(),
		goalPoint: null,
		diff: null,
	}

	localStorage.setItem(KEY_REF, JSON.stringify(obj));
	initialiseTimer();
}

function loadRefPoint() {
	let item = localStorage.getItem(KEY_REF);

	return item ? JSON.parse(item).refPoint : item;
}

function syncTheTime() {
	let now = new Date();
	let diff = ref_point - now;
	let sign = Math.sign(diff);

	showStart.innerHTML = `${formatDateToText(sign >= 0 ? now : ref_point)} から` ;
	showEnd.innerHTML = `${formatDateToText(sign >= 0 ? ref_point : now)} まで` ;

	showDiff.innerHTML = timeToText(Math.abs(diff));
}

function initialiseTimer() {
	clearInterval(interval);

	let ref = loadRefPoint();
	ref_point = ref == null ? new Date() : new Date(ref);
	if (ref == null) {
		saveRefPoint(ref_point);
	}

	inteval = setInterval(syncTheTime, 200);
}

function toggleShowingDays() {
	show_days = !show_days;
}

function hueToThemeColours(hue){
	let secHue = (hue + 180) % 256;
	
	return {
		Primary: `hsl(${hue}, 75%, 60%)`,
		PrimaryVivid: `hsl(${hue}, 80%, 50%)`,
		PrimaryLight: `hsl(${hue}, 60%, 75%)`,
		PrimaryDark: `hsl(${hue}, 60%, 40%)`,

		Secondary: `hsl(${secHue}, 75%, 60%)`,
		SecondaryVivid: `hsl(${secHue}, 80%, 50%)`,
		SecondaryLight: `hsl(${secHue}, 60%, 75%)`,
		SecondaryDark: `hsl(${secHue}, 60%, 40%)`,
	};
}

function applyTheme(hue){
	let colours = hueToThemeColours(hue);

	controlBar.style.background = colours.PrimaryLight;

	for(child of onDisplayControlBar.children){
		if(child.tagName.toLowerCase() == "svg") for(_child of child.children) if(_child.tagName.toLowerCase() == "path"){
			_child.style.fill = colours.PrimaryDark;
		}
	}

	document.getElementById(ID.TITLE_BAR).innerHTML = `Time <span style='color: ${colours.PrimaryDark}'>D</span>iff`;
}