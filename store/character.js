export const state = () => ({
  characters: [],
  initiative: [
    {
      id: "5f5005cf3679d19174533115",
      value: 12
    },
    {
      id: "5f4ec32d84e88f4662e6994c",
      value: 14
    },
    {
      id: "5f5005e83679d19174533116",
      value: 9
    },
    {
      id: "5f4e84a100e1a15b8c582561",
      value: 20
    },
  ]
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
  orderInitiative(state) {
    state.initiative.sort((a, b) => a.value - b.value)
  }
}
