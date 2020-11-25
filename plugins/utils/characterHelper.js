export function getCharactersByPlayerID(id) {
  let playerCharacters = [];
  for (let character of this.$store.state.character.characters) {
    for (let player of character.players) {
      if (player.id === id) {
        playerCharacters.push(character);
      }
    }
  }
  return playerCharacters;
}

export function getCharacterByID(id) {
  for (let character of this.$store.state.characters.characters) {
    if (character.id === id) {
      return character;
    }
  }
  return {};
}
