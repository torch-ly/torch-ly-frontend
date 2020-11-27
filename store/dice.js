export const state = () => ({
	value: ""
});

export const mutations = {
	roll(state, dice) {
		state.value = dice;
	}
};
