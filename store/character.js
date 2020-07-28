export const state = () => ({
  characters: []
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
  }
}
