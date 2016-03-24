export function checkHttpStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	} else {
		console.log('error:', response.statusText);

		return response.json().then(json => {
			console.log(json);
			var error = new Error(json.message);
			error.response = response;
			throw error;
		});
	}
}

export function parseJSON(response) {
	return response.json();
}