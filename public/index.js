const PingSender = require('../modules/pingsender');
const UserConfig = require('../modules/user-config');

const pingSender = new PingSender();
const config = new UserConfig('settings', {
	ipList: []
});

$('#address-form').submit(function (e) {
	e.preventDefault();
	const address = $('#address-input').val();

	// TODO: ip validation
	const ipList = config.get('ipList');
	ipList.push({ host: address, active: true });
	config.set('ipList', ipList);

	pingSender.start(address);

	const addressDiv = `
		<div id="${address}">
			<p>${address}:</p>
			<p class="ping-display"></p>
		</div>
		<hr>
	`;
	$('#ping-display').append(addressDiv);
});

pingSender.on('ping', (ip, pingObj) => {
	const pingDisplay = $(`#${ip} .ping-display`);
	console.log(pingDisplay)

	const time = pingObj.time;
	console.log(time)
	if (time <= 50) {
		pingDisplay.css('color', 'green');
	} else if (time <= 100) {
		pingDisplay.css('color', 'yellow');
	} else {
		pingDisplay.css('color', 'red');
	}

	pingDisplay.text(time + ' ms');
});