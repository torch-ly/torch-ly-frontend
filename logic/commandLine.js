import {store} from "@/logic/stage/main";

export function parseCommand(command) {

	command = command.toLocaleString();

	commandPattern(command, roll, "/roll", "/r" );

	commandPattern(command, () => store.commit("console/clearConsole"), "/clear" );

}

function commandPattern(command, func, ...args) {
	for (let arg of args)
		if (command.startsWith(arg + " ") || command === arg)
			func(parameterHelper(command.replace(arg + " ", "")));

}

function parameterHelper(command) {
	let parameters = {};
	let lastCommand = "default";

	for (let part of command.split(" "))
		if (part.charAt(0) === "-")
			if (part.charAt(1) === "-")
				lastCommand = part.substring(2);
			else
				lastCommand = part.substring(1);

		else if (!parameters[lastCommand])
			parameters[lastCommand] = [ part ];
		else
			parameters[lastCommand].push(part);

	return parameters;

}

function roll(parameters) {
	store.commit("dice/roll", parameters.default.reduce((a, b) => a + "+" + b));
}

