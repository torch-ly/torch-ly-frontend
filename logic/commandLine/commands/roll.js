import {store} from "@/logic/stage/main";
import {bindParameterToFunction} from "@/logic/commandLine/helperFunctions";

export function roll(parameters) {

	bindParameterToFunction(parameters, _default);

	bindParameterToFunction(parameters, advantage, "a", "advantage");

	bindParameterToFunction(parameters, disadvantage, "d", "disadvantage");

}

function _default(parameters) {
	store.commit("dice/roll", parameters.reduce((a, b) => a + "+" + b));
}

function advantage() {
	console.warn("Advantage is currently not supported.");
}

function disadvantage() {
	console.warn("Disadvantage is currently not supported.");
}
