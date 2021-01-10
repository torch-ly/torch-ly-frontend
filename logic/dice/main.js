"use strict";

import {$t} from "@/logic/dice/teal";
import {store} from "@/logic/stage/main";

export let box, query;

let canvas;

export function roll(dice) {
	box.start_throw(parse_notation(dice), before_roll, after_roll);
}

export function dice_initialize() {
	canvas = $t.id("canvas");
	canvas.style.width = "100%";
	canvas.style.height = "100%";

	$t.dice.use_true_random = false;


	box = new $t.dice.dice_box(canvas, { w: 500, h: 300 });
	box.animate_selector = false;

	$t.bind(window, "resize", function() {
		canvas.style.width = "100%";
		canvas.style.height = "100%";
		box.reinit(canvas, { w: 500, h: 300 });
	});


}

export function clearBox() {
	box.clear();
	box.rolling = false;
}

function before_roll(vectors, notation, callback) {
	callback();
}

function after_roll(notation, result) {

	let out = [];

	let index = 0;

	for (let element of query.split("+"))
		if (!element.includes("1d100")) // the d100 is managed within the d10
			if (element.charAt(0) === "a" || element.charAt(0) === "m")
				if (element.charAt(1) === "z") { // dice is a d100 with advantage
					out.push({
						type: element.charAt(0),
						value: [ [ result[ index], result[ index + 2 ] ],
							[ result[ index + 1 ], result[ index + 3 ] ] ]
					});
					index += 4;
				} else
					out.push({ // dice has advantage
						type: element.charAt(0),
						value: [ result[ index++ ], result[ index++ ] ]
					});
			else if (element.charAt(0) === "z")
				out.push({	// dice is a d100
					type: "n",
					value: [ result[ index++ ] , result[ index++ ] ]
				});
			else
				out.push({ // dice is nether a d100 nor has advantage
					type: "n",
					value: [ result[ index++ ] ]
				});


	let outCopy = [ ...out ];
	for (let i = 0; i < out.length; i++)
		if (out[i].type === "n")  // without a oder d
			if (out[i].value.length === 2)  // is d100
				outCopy[i].value = (out[i].value[0] + out[i].value[1]) % 100;
			else  // is not d100
				outCopy[i].value = out[i].value[0];

		else if (out[i].value[0].length === 2)  // is with a or d and d100
			outCopy[i].value = [
				(out[i].value[0][0] + out[i].value[0][1]) % 100,
				(out[i].value[1][0] + out[i].value[1][1]) % 100,
			];
	// else case is already correct

	console.log(outCopy);
	store.dispatch("console/addToLog", {
		type: "roll-response",
		log: JSON.stringify(outCopy)
	});

}

function parse_notation(notation) {

	// interpret 1d100 as 1d10 + 1d100

	const regex_d100 = /(?<adv>[a,m])?1d100/gm;
	const subst_d100 = "$<adv>z1d10+$<adv>1d100";

	notation = notation.replace(regex_d100, subst_d100);

	query = notation;

	// advantage and disadvantage
	const regex_adv = /(?<type>[a,m])(?<z>z?)1d(?<sides>\d+)/gm;
	const subst_adv = "$<type>$<z>1d$<sides>+1d$<sides>";

	notation = notation.replace(regex_adv, subst_adv);

	let dice_types = [ "d4", "d6", "d8", "d10", "d12", "d20", "d100" ];
	let no = notation.split("@");
	let dr0 = /\s*(\d*)([a-z]+)(\d+)(\s*(\+|-)\s*(\d+)){0,1}\s*(\+|$)/gi;
	let dr1 = /(\b)*(\d+)(\b)*/gi;
	let ret = { set: [], constant: 0, result: [], error: false }, res;

	// eslint-disable-next-line no-cond-assign
	while (res = dr0.exec(no[0])) {
		let command = res[2];
		if (command !== "d") {
			ret.error = true; continue;
		}
		let count = parseInt(res[1]);
		if (res[1] === "") count = 1;
		let type = "d" + res[3];
		if (dice_types.indexOf(type) === -1) {
			ret.error = true; continue;
		}
		while (count--) ret.set.push(type);
		if (res[5] && res[6])
			if (res[5] === "+") ret.constant += parseInt(res[6]);
			else ret.constant -= parseInt(res[6]);

	}

	// eslint-disable-next-line no-cond-assign
	while (res = dr1.exec(no[1]))
		ret.result.push(parseInt(res[2]));

	return ret;
}
