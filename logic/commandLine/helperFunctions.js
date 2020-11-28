export function commandPattern(command, func, ...args) {
	for (let arg of args)
		if (command.startsWith(arg + " ") || command === arg)
			func(parameterHelper(command.replace(arg + " ", "")));

}

export function parameterHelper(command) {
	let parameters = {};
	let lastCommand = "default";

	for (let part of command.split(" "))
		if (part.charAt(0) === "-")
			if (part.charAt(1) === "-") {
				lastCommand = part.substring(2);
				parameters[lastCommand] = [];
			} else if (part.length === 2) {
				lastCommand = part.substring(1);
				parameters[lastCommand] = [];
			} else
				console.error("Unknown parameter type \"" + part + "\". Please use --help to get help with this command.");

		else if (!parameters[lastCommand])
			parameters[lastCommand] = [ part ];
		else
			parameters[lastCommand].push(part);

	return parameters;

}

export function bindParameterToFunction(parameters, func, ...args) {
	if (!args.length)
		args.push("default");

	for (let arg of args)
		if (Object.prototype.hasOwnProperty.call(parameters, arg))
			func(parameters[arg]);
}
