const { app, BrowserWindow, Menu, Tray, globalShortcut } = require('electron');

let win = null;
let tray = null;

function createWindow() {
	// Window
	win = new BrowserWindow({
		width: 300,
		height: 500,
		useContentSize: true,
		// resizable: false,
		minimizable: false,
  		maximizable: false,
		webPreferences: {
			nodeIntegration: true,
			nodeIntegrationInWorker: true
		}
	});

	win.loadFile('./public/index.html');

	// win.webContents.openDevTools();

	win.on('closed', () => {
		win = null;
	});
	win.on('blur', () => {
		// win.hide();
	});

	// Shortcuts
	globalShortcut.register('Control+R', () => {
		app.relaunch();
		app.quit();
	});

	// Tray 
	tray = new Tray('./icons/pingchecker_icon.png');
	tray.setToolTip('Pingchecker');
	const contextMenu = Menu.buildFromTemplate([
		{ label: 'Restart', click: () => { app.relaunch(); app.quit(); } },
		{ label: 'Exit', click: () => { app.quit(); } }
	]);
	tray.setContextMenu(contextMenu);

	tray.on('click', () => {
		win.show();
	});

	Menu.setApplicationMenu(null);
}

app.on('ready', createWindow);