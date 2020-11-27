import {store} from "@/logic/stage/main";

export function parseCommand(command) {

	command = command.toLocaleString();

	commandPattern(command, roll, "/roll", "/r" );

}

function commandPattern(command, func, ...args) {
	for (let arg of args)
		if (command.startsWith(arg + " "))
			func(command.replace(arg + " ", ""));
}


function roll(command) {
	store.commit("dice/roll", command.replaceAll(" ", "+"));
}
