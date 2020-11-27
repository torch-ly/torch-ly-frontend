function getParameterStringToObject(parameterString) {
	const parameter = {};
	const parameterObject = parameterString.split("&");

	for (let i = 0; i < parameterObject.length; i++) {
		const tmp = parameterObject[i].split("=");
		parameter[tmp[0]] = tmp[1];
	}

	return parameter;
}

export function getParameters() {
	const parameterString = window.location.search.substr(1);
	return parameterString != null && parameterString !== "" ? getParameterStringToObject(parameterString) : {};
}
