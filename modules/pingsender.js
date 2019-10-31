const win = require('electron').remote.getCurrentWindow();

const ping = require('ping');
const EventEmitter = require('events');

class PingSender extends EventEmitter {
	constructor() {
		super();

		this.activeIPs = [];

		setInterval(this.examinePings.bind(this), 1000);
	}

	start(ip) {
		if (typeof ip === 'string') {
			this.activeIPs.push(ip);
		}
	}

	stop(ip) {
		if (this._pingIntervals[ip]) {
			clearInterval(this._pingIntervals[ip]);
			delete this._pingIntervals[ip];
		}
	}

	examinePings() {
		if (win.isVisible) {
			for (const ip of this.activeIPs) {
				ping.promise.probe(ip).then((res) => {
					this.emit('ping', ip, res);
				});
			}
		}
	}
}

module.exports = PingSender;