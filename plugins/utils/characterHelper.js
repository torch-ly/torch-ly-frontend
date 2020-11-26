export function getCharactersByPlayerID(id) {

	if (id) {
		let playerCharacters = [];
		for (let character of this.$store.state.character.characters) 
			for (let player of character.players) 
				if (player.id === id) 
					playerCharacters.push(character);
				
			
		
		return playerCharacters;
	} else 
		return this.$store.state.character.characters.filter((character) => character.players.length === 0);
	


}

export function getCharacterByID(id) {
	for (let character of this.$store.state.character.characters) 
		if (character.id === id) 
			return character;
		
	
	return {};
}
