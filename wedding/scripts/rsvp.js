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
			'invitations': [{'rsvp': (responses[i] === 'accept'), 'eventId': 'ddc138bc-46a7-40c8-81b3-68aef2ee5bd3'}]
		};
		guests.push(guest);
	}

	const body =
	{
		'weddingId': '00bf6d56-8d6e-4935-9be7-0609868f33ef',
		'people': guests,
		'answers':
		[
			{
				'questionId': 'bd3230c0-eb30-44fb-8740-d96e48f51a63',
				'text': song_requests
			}
		]
	};

	const url = 'https://api.guests.xogrp.com/v1/weddings/00bf6d56-8d6e-4935-9be7-0609868f33ef/households';
	const headers = 
	{
		'Accept': 'application/json, text/plain, */*',
		'Accept-Encoding': 'gzip, deflate, br',
		'Content-Type': 'application/json;charset=utf-8',
		'X-MEMBER-UUID': 'de14538b-7394-42a2-9853-f3b40a51953d',
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

	const line_break = document.createElement('br');

	let first_name_text = document.createElement('input');
	first_name_text.type = 'text';
	first_name_text.name = 'first_names';
	first_name_text.placeholder = 'First name';
	first_name_text.required = true;

	let last_name_text = document.createElement('input');
	last_name_text.type = 'text';
	last_name_text.name = 'last_names';
	last_name_text.placeholder = 'Last name';
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

	guest_list.appendChild(line_break);
	guest_list.appendChild(first_name_text);
	guest_list.append(' ');
	guest_list.appendChild(last_name_text);
	guest_list.append(' ');
	guest_list.appendChild(accept_radio);
	guest_list.append(' ');
	guest_list.appendChild(accept_label);
	guest_list.append(' ');
	guest_list.appendChild(decline_radio);
	guest_list.append(' ');
	guest_list.appendChild(decline_label);
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
