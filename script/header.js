// Constants
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

// Functions
function fillChars(text = "", length = 0, char = "0", direction = 0) {
	text = text.toString();

	let filler = "";
	for (let i = 0; i < Math.max(0, length - text.length); i++) filler += char;

	return (direction == 0 ? filler : "") + text + (direction == 1 ? filler : "");
}

function formatDateToText(date){
	return `${date.getFullYear()}年 ` +
	`${fillChars(String(date.getMonth() + 1), 2, "0")}月` +
	`${fillChars(String(date.getDate()), 2, "0")}日 ` +
	`${fillChars(String(date.getHours()), 2, "0")}:${fillChars(String(date.getMinutes()), 2, "0")}:${fillChars(String(date.getSeconds()), 2, "0")}`;
}

function formatTime(milliseconds){
	let d_days = Math.floor(milliseconds / Unit.DAY);
	let d_hours = Math.floor((milliseconds % Unit.DAY) / Unit.HOUR);
	let d_minutes = Math.floor((milliseconds % Unit.HOUR) / Unit.MINUTE);
	let d_seconds = Math.floor((milliseconds % Unit.MINUTE) / Unit.SECOND);
	let d_milliseconds = milliseconds % Unit.SECOND;

	return {
		milliseconds: d_milliseconds,
		seconds: d_seconds,
		minutes: d_minutes,
		hours: d_hours,
		days: d_days,
	};
}

function timeToText(milliseconds) {
	let time = formatTime(milliseconds);

	let t_seconds = `${fillChars(time.seconds, 2, "0")}s`;
	let t_minutes = `${fillChars(time.minutes, 2, "0")}m`;
	let t_hours = `${fillChars(time.hours, 2, "0")}h`;
	let t_days = `${fillChars(time.days, 3, "0")}day${time.days > 1 ? "s" : ""}`;

	return {
		days: t_days,
		time: `${t_hours}${t_minutes}${t_seconds}`,
	};
}

async function takesScreenshot(target = document.documentElement, width = window.innerWidth, height = window.innerHeight, download = false){
	let now = new Date();

	let canvas = await domToCanvas(target, width, height);
	if(download) downloadByURL(canvas.toDataURL("image/png"), `screenshot_${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}.png`);

	return canvas;
}

async function domToCanvas(dom, width = 1920, height = 1080){
	let result;

	await html2canvas(dom, {
		windowWidth: width,
		windowHeight: height,
		width: width,
		height: height,
		scale: 1,
	}).then(canvas => {
		result = canvas;
	});

	return result;
}

async function canvasToFile(canvas){
	let file;
	canvas.toBlob(blob => {
		file = new File([blob], "", {
			type: blob.type,
		})
	});

	return file;
}

function downloadByURL(url, filename = "undefined"){
	let anchor = document.createElement("a");
	anchor.href = url;
	anchor.download = filename;
	anchor.click();
	anchor.remove();
}

function makeFullscreen(target = document.documentElement, toggle){
	if(toggle == null) toggle = document.fullscreenElement !== null;
	
	if(toggle){
		target.requestFullscreen({ navigationUI: "show" })
		.then(() => { })
		.catch(err => {
			console.log(err);
		});
	}else{
		document.exitFullscreen();
	}
}

/* Share */
async function share(title, text, url, files){
	await navigator.share({
		title: title,
		text: text,
		url: url,
		files: files,
	});
}