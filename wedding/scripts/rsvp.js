function handle(response) {
	if (response.ok) {
		document.getElementById('rsvp_form').style.display = 'none';
		document.getElementById('instructions').style.display = 'none';
		document.getElementById('error_message').style.display = 'none';
		document.getElementById('thank_you_message').style.display = 'flex';
	} else {
		document.getElementById('error_message').style.display = '';
	}
}

function rsvp(first_names, last_names, responses, song_requests) {
	let guests = [];
	for (let i = 0; first_names[i] !== undefined; i++) {
		const guest =
		{
			'firstName': first_names[i],
			'lastName': last_names[i],
			'invitations': [{'rsvp': (responses[i] === 'accept'), 'eventId': '2b948eee-8709-4a3e-9240-6095c5a9bd7c'}]
		};
		guests.push(guest);
	}

	const body =
	{
		'weddingId': 'dae9d257-3f3a-4257-8d36-01437fc44bef',
		'people': guests,
		'answers':
		[
			{
				'questionId': 'bb99d2ea-2ac3-459d-a334-680cbf584560',
				'text': song_requests
			}
		]
	};

	const url = 'https://api.guests.xogrp.com/v1/weddings/dae9d257-3f3a-4257-8d36-01437fc44bef/households';
	const headers = 
	{
		'Accept': 'application/json, text/plain, */*',
		'Accept-Encoding': 'gzip, deflate, br',
		'Content-Type': 'application/json;charset=utf-8',
		'X-MEMBER-UUID': '236ca74d-69b5-4d0d-bb80-a69a89c07b6f',
		'X-API-KEY': 'cb19a1a448292169c09eb9730499a08f38149c749270d99676eb7edf3cc69b5f'
	};
	const options = { 'method': 'POST', 'headers': headers, 'body': JSON.stringify(body), 'mode': 'cors' };
	const request = new Request(url, options);
	fetch(request).then(response => handle(response));
}

let response = 0;
function add_guest() {
	response++;
	let guest_list = document.getElementById('guest_list');

	let first_name_text = document.createElement('input');
	first_name_text.type = 'text';
	first_name_text.name = 'first_names';
	first_name_text.placeholder = 'First name';
	first_name_text.size = '10';
	first_name_text.required = true;

	let last_name_text = document.createElement('input');
	last_name_text.type = 'text';
	last_name_text.name = 'last_names';
	last_name_text.placeholder = 'Last name';
	last_name_text.size = '10';
	last_name_text.required = true;

	let accept_radio = document.createElement('input');
	accept_radio.type = 'radio';
	accept_radio.name = 'response' + response;
	accept_radio.value = 'accept';
	accept_radio.required = true;

	let accept_label = document.createElement('label');
	accept_label.for = 'accept';
	accept_label.innerHTML = 'Accept';

	let decline_radio = document.createElement('input');
	decline_radio.type = 'radio';
	decline_radio.name = 'response' + response;
	decline_radio.value = 'decline';
	decline_radio.required = true;

	let decline_label = document.createElement('label');
	decline_label.for = 'decline';
	decline_label.innerHTML = 'Decline';

	let options = document.createElement('span');
	options.className = 'options';
	options.appendChild(accept_radio);
	options.append(' ');
	options.appendChild(accept_label);
	options.append(' ');
	options.appendChild(decline_radio);
	options.append(' ');
	options.appendChild(decline_label);
	
	guest_list.appendChild(document.createElement('br'));
	guest_list.appendChild(document.createElement('br'));
	guest_list.appendChild(first_name_text);
	guest_list.append(' ');
	guest_list.appendChild(last_name_text);
	guest_list.append(' ');
	guest_list.append(options);
}

function get_values(inputs) {
	if (inputs[0] === undefined) {
		inputs = [inputs];
	}

	let values = []
	for (let i = 0; inputs[i] !== undefined; i++) {
		values.push(inputs[i].value);
	}
	return values;
}

function get_responses(guest_list) {
	let responses = [];
	for (let i = 0; guest_list['response' + i] !== undefined; i++) {
		responses.push(guest_list['response' + i].value);
	}
	return responses;
}
