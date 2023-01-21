const fs = require("fs");
const os = require("os");
const path = require("path");
const { app, BrowserWindow, Menu } = require("electron");

const RESOLUTION = {
	width: 1280,
	height: 800,
};

if (require("electron-squirrel-startup")) {
	return app.quit();
}

function checkGames() {
	const directory = path.join(os.homedir(), ".maragato");
	fs.mkdirSync(directory, { recursive: true });
	fs.writeFileSync(path.resolve(directory, app.name), "");
	return fs.readdirSync(directory);
}

function createWindow(games) {
	const win = new BrowserWindow({
		width: RESOLUTION.width,
		height: RESOLUTION.height,
		icon: path.join(__dirname, "icon.png"),

		// webPreferences: {
		// 	preload: path.join(__dirname, "preload.js")
		// },
	});

	win.loadFile("index.html", {query: {games: JSON.stringify(games)}});
}

app.whenReady().then(() => {
	Menu.setApplicationMenu(null);
	createWindow(checkGames());

	app.on("activate", function () {
		if (!BrowserWindow.getAllWindows().length) {
			createWindow();
		}
	});
});

app.on("window-all-closed", function () {
	app.quit();
});
