import {setInitiative} from "@/plugins/backendComunication/initiative";

export const state = () => ({
  characters: [],
  initiative: []
})

export const mutations = {
  loadCharacters(state, characters) {
    state.characters = characters.sort((a, b) => a.name.localeCompare(b.name));
  },
  updateCharacter(state, character) {
    state.characters = state.characters.filter(char => char.id != character.id);
    state.characters.push(character);
    state.characters.sort((a, b) => a.name.localeCompare(b.name));
  },
  addCharacter(state, character) {
    state.characters.push(character);
  },
  setInitiativeOrder(state, order) {
    state.initiative = order;
  },
  nextTurn(state) {
    state.initiative.push(state.initiative.shift());
    setInitiative();
  },
  orderInitiative(state) {
    state.initiative.sort((a, b) => a.value - b.value);
    setInitiative();
  },
}
