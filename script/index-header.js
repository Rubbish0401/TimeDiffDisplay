const KEY_REF = "referencepoint";

// Element IDs
const ID_DISPLAY = "display";
const ID_TITLEBAR = "title";

const ID = {
	// Display
	DISPLAY: "display",

	TOP_PANE: "top-pane",
	MIDDLE_PANE: "middle-pane",
	BOTTOM_PANE: "bottom-pane",

	SHOW_START: "show-start",
	SHOW_DIFF_DAYS: "show-diff-days",
	SHOW_DIFF_TIME: "show-diff-time",
	SHOW_END: "show-end",

	// Control Bar
	CONTROL_BAR: "controlbar",

	TITLE_BAR: "title",

	HIDE_BUTTON: "btn-hide",
	EXPAND_BUTTON: "btn-expand",
	SHRINK_BUTTON: "btn-shrink",
	EDIT_BUTTON: "btn-edit",
	SHARE_BUTTON: "btn-share",

	// On-Display Control Bar
	ON_DISPLAY_CONTROL_BAR: "ondisplay-controlbar",
	SHOW_BUTTON: "btn-show",

	// Sharing Dialogue
	SHARE_DIALOGUE: "dialogue-share",

	// Editing Dialogue
	EDIT_DIALOGUE: "dialogue-edit"
};

// Variables
var ref_point;
var interval;

var themeHue = 0; // 0 to 255 int

var touchInterval;
var touchingTime = 0;

var shareFile;

// Display
var display;

var topPane;
var middlePane;
var bottomPane;

var showStart;
var showDiffDays;
var showDiffTime;
var showEnd;

// Control Bar
var controlBar;
var hideBtn;
var expandBtn;
var shrinkBtn;
var editBtn;
var shareBtn;

// On-Display Control Bar
var onDisplayControlBar;
var showBtn;

// Sharing Dialogue
var shareDialogue;

// Editing Dialgue
var editDialogue;

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

	let timeText = timeToText(Math.abs(diff));

	showStart.innerHTML = `${formatDateToText(sign >= 0 ? now : ref_point)} から` ;
	showEnd.innerHTML = `${formatDateToText(sign >= 0 ? ref_point : now)} まで` ;

	showDiffDays.innerHTML = timeText.days.replace(/[a-z]+/g, match => `<span class="small-font">${match}</span>`);
	showDiffTime.innerHTML = timeText.time.replace(/[a-z]+/g, match => `<span class="small-font">${match}</span>`);
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
	if(middlePane.classList.contains("show-whole")){
		middlePane.classList.remove("show-whole");
	}else{
		middlePane.classList.add("show-whole");
	}
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