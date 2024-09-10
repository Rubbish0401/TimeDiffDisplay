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

async function takesScreenshot(width = window.innerWidth, height = window.innerHeight){
	let now = new Date();

	let canvas = await domToCanvas(document.documentElement, width, height);
	downloadByURL(canvas.toDataURL("image/png"), `screenshot_${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}.png`);
}

async function domToCanvas(dom, width = 1920, height = 1080){
	let result;

	await html2canvas(dom, {
		windowWidth: width,
		windowHeight: height,
		scale: 1,
	}).then(canvas => {
		result = canvas;
	});

	return result;
}

function downloadByURL(url, filename = "undefined"){
	let anchor = document.createElement("a");
	anchor.href = url;
	anchor.download = filename;
	anchor.click();
	anchor.remove();
}