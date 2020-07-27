export const state = () => ({
  characters: []
})

export const mutations = {
  loadCharacters(state, characters) {
    state.characters = characters;
  },
  updateCharacter(state, character) {
    state.characters.filter(char => char.id == character.id)[0] = character;
  },
  addCharacter(state, character) {
    state.characters.push(character);
  }
}
