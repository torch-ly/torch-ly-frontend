export const state = () => ({
	players: []
});

export const mutations = {
	setPlayers(state, player) {
		state.players = player;
	}
};
