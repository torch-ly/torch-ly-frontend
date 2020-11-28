"use strict";

import {$t} from "@/logic/dice/teal";
import {store} from "@/logic/stage/main";

export let box;

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

	store.dispatch("console/addToLog", {
		type: "roll-response",
		log: JSON.stringify(result)
			.replace("[", "")
			.replace("]", "")
	});

	console.info(1, notation, JSON.parse(JSON.stringify(result)));
}

function parse_notation(notation) {
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
