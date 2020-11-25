import {addToInitiative, setInitiative} from "@/plugins/backendComunication/initiative";

export const state = () => ({
	characters: [],
	initiative: [],
	hoverOverCharacter: "",
	selectedCharacter: "",
});

export const mutations = {
	loadCharacters(state, characters) {
		state.characters = characters.sort((a, b) => a.name.localeCompare(b.name));
	},
	removeCharacter(state, characterID) {
		state.characters = state.characters.filter(char => char.id != characterID);
	},
	updateCharacter(state, character) {
		state.characters = state.characters.filter(char => char.id != character.id);
		state.characters.push(character);
		state.characters.sort((a, b) => a.name.localeCompare(b.name));
	},
	addCharacter(state, character) {
		state.characters.push(character);
	},
	setInitiativeOrderWithoutSaving(state, order) {
		state.initiative = order;
	},
	setInitiativeOrder(state, order) {
		state.initiative = order;
		setInitiative();
	},
	nextTurn(state) {
		state.initiative.push(state.initiative.shift());
		setInitiative();
	},
	orderInitiative(state) {
		state.initiative.sort((a, b) => b.value - a.value);
		setInitiative();
	},
	addCharacterToInitiative(state, character) {
		addToInitiative(character.id, character.value);
	},
	removeCharacterFromInitiative(state, characterID) {
		state.initiative = state.initiative.filter(char => char.id != characterID);
	},
	setHoverOverCharacter(state, characterID) {
		state.hoverOverCharacter = characterID;
	},
	setSelectedCharacter(state, characterID) {
		state.selectedCharacter = characterID;
	}
};
