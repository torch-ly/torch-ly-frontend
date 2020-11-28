import {store} from "@/logic/stage/main";
import {bindParameterToFunction} from "@/logic/commandLine/helperFunctions";

export function roll(parameters) {

	bindParameterToFunction(parameters, _default);

}

function _default(parameters) {
	store.commit("dice/roll", parameters.reduce((a, b) => a + "+" + b));
}
