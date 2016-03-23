export function checkHttpStatus(response) {
	console.log('checkHttpStatus  ', response);
	if (response.status >= 200 && response.status < 300) {
		return response
	} else {
		console.log('error:', response.statusText);

		var error = new Error(response.statusText)
		error.response = response
		throw error
	}
}

export function parseJSON(response) {
	return response.json();
	//throw new Error('返回值非json格式');
}