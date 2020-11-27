export const state = () => ({
	errors: new Set([])
});

export const mutations = {
	addError(state, error) {
		state.errors.add(error);
	}
};
