import {parseCommand} from "@/logic/commandLine";

export const state = () => ({
	log: []
});

export const mutations = {
	executeCommand(state, command) {
		parseCommand(command);
	},
	addLog(state, log) {
		state.log.push(log);
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
		console.log(data.type, data.log);
		commit("addLog", {
			type: data.type,
			value: data.log
		});
	}
};
