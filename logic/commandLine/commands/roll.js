import {store} from "@/logic/stage/main";
import {bindParameterToFunction} from "@/logic/commandLine/helperFunctions";

let diceQuery = "";

export function roll(parameters) {

	bindParameterToFunction(parameters, _default);

	bindParameterToFunction(parameters, advantage, "a", "advantage");

	bindParameterToFunction(parameters, disadvantage, "d", "disadvantage");

	bindParameterToFunction(parameters, help, "h", "help");

	store.commit("dice/roll", diceQuery);

	diceQuery = "";
}

function _default(parameters) {
	diceQuery += parameters.reduce((a, b) => a + "+" + b);
}

function advantage(parameters) {

	if (diceQuery.length !== 0 && parameters.length > 0)
		diceQuery += "+";

	for (let param of parameters)
		diceQuery += ("a1d" + param.split("d")[1] + "+").repeat(parseInt(param));

	if (diceQuery.charAt(diceQuery.length - 1) === "+")
		diceQuery = diceQuery.substring(0, diceQuery.length - 1);

}

function disadvantage(parameters) {

	if (diceQuery.length !== 0 && parameters.length > 0)
		diceQuery += "+";

	for (let param of parameters)
		diceQuery += ("m1d" + param.split("d")[1] + "+").repeat(parseInt(param));

	if (diceQuery.charAt(diceQuery.length - 1) === "+")
		diceQuery = diceQuery.substring(0, diceQuery.length - 1);

}

function help() {
	store.dispatch("console/addToLog", {
		type: "help",
		log: "/roll [number]d[sides]. Use -a or -d to use advantage or disadvantage (currently not supported)"
	});
}
