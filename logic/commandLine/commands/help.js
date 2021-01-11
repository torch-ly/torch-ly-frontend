import {bindParameterToFunction} from "@/logic/commandLine/helperFunctions";
import {store} from "@/logic/stage/main";

export function help(parameters) {
	bindParameterToFunction(parameters, _default);

	bindParameterToFunction(parameters, helper, "help", "h");
}

function _default() {
	store.dispatch("console/addToLog", {
		type: "help",
		log: "Currently there are the /roll and /clear commands. To get more information try \"/[command] --help\"."
	});
}

function helper() {
	store.dispatch("console/addToLog", {
		type: "help",
		log: "Try /help to get help."
	});
}
