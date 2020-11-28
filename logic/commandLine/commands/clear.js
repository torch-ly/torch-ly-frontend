import {store} from "@/logic/stage/main";
import {bindParameterToFunction} from "@/logic/commandLine/helperFunctions";

export function clear(parameters) {

	bindParameterToFunction(parameters, _default);

	bindParameterToFunction(parameters, help, "h", "help");
}

function _default() {
	store.commit("console/clearConsole");
}

function help() {
	store.dispatch("console/addToLog", {
		type: "help",
		log: "Clears the entire console."
	});
}
