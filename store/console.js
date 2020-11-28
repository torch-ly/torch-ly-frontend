import {parseCommand} from "@/logic/commandLine";

export const state = () => ({
	log: [],
	openConsolePopup: false,
});

export const mutations = {
	executeCommand(state, command) {
		parseCommand(command);
	},
	addLog(state, log) {
		state.log.push(log);
	},
	openConsolePopup(state, value) {
		state.openConsolePopup = value;
	}
};

export const actions = {
	execute({commit}, command) {
		commit("executeCommand", command);
		commit("addLog", {
			type: "command",
			value: command
		});
	},
	addToLog({commit}, data) {
		commit("addLog", {
			type: data.type,
			value: data.log
		});
	}
};
