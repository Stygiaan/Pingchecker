const electron = require('electron');
const path = require('path');
const fs = require('fs');

class UserConfig {
	constructor(fileName, defaultConfig) {
		const userDataPath = (electron.app || electron.remote.app).getPath('userData');
		this.path = path.join(userDataPath, fileName + '.json');

		this.data = this.parseDataFile(defaultConfig);
	}

	get(key) {
		return this.data[key];
	}

	set(key, val) {
		this.data[key] = val;

		fs.writeFileSync(this.path, JSON.stringify(this.data));
	}

	parseDataFile(defaultConfig) {
		try {
			return JSON.parse(fs.readFileSync(this.path));
		} catch {
			fs.writeFileSync(this.path, defaultConfig);
			return defaultConfig;
		}
	}
}

module.exports = UserConfig;