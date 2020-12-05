<template>
    <div class="mt-4">
        <input
            v-model="name"
            type="text"
            class="font-bold pl-1 rounded bg-gray-700"
        >

        <div
            v-if="showStats"
            class="w-full flex flex-column my-4 justify-center items-center"
        >
            <img
                class="w-20 h-20 block"
                draggable="false"
                :src="selectedCharacter.token"
            >
            <div class="w-2/3 flex-col ml-2 pl-2 border-l-2 text-lg py-2">
                <span class="block">
                    <form @submit.prevent="evaluateHPBox()">
                        <div class="flex flex-row justify-between">
                            <div class="w-1/3">HP: </div>
                            <input
                                v-model="hp"
                                class="w-2/3 text-black pl-1 rounded"
                                type="text"
                                autocomplete="off"
                                @keyup.enter="evaluateHPBox()"
                            >
                        </div>
                        <div class="flex flex-row justify-between mt-1">
                            <div class="w-1/3">AC: </div>
                            <input
                                v-model="ac"
                                class="w-2/3 text-black pl-1 rounded"
                                type="number"
                            >
                        </div>
                        <div
                            class="submit-button active:submit-button-active my-2"
                            @click="saveCharacterDetailChanges()"
                        >Save changes</div>
                    </form>
                </span>
            </div>
        </div>

        <div
            v-else
            class="text-center my-6"
        >
            This character is not controlled by you.
            <br>
            <div
                class="underline p-1 hover:text-blue-500"
                @click="showStats = true"
            >
                Click here to show stats anyhow.
            </div>
        </div>

        <div class="hr" />

        <button
            class="submit-button active:submit-button-active my-2"
            @click="openPlayersPopup()"
        >
            Add Players
        </button>

        <button
            class="submit-button active:submit-button-active my-2"
            @click="openInitiativePrompt()"
        >
            {{ !alreadyInInitiativeOrder ? "Add to" : "Edit" }} Initiative
        </button>

        <button
            class="submit-button active:submit-button-active my-2"
            @click="openConditionsPopup()"
        >
            Add Conditions
        </button>

        <div v-if="showStats">
            <div class="hr" />

            <div class="text-lg my-2">
                Notes:
            </div>
            <textarea
                v-model="notes"
                class="text-black w-full rounded p-1"
            />
        </div>
    </div>
</template>
<script>
import {evaluate} from "mathjs";
import {setCharacterDetails, setCharacterName} from "@/plugins/backendComunication/characters";
import {store} from "@/logic/stage/main";

export default {
	data() {
		return {
			selectedCharacter: null,
			hp: 0,
			ac: 0,
			notes: null,
			name: null,
			showStats: false
		};
	},
	computed: {
		characterStore() {
			return this.$store.state.character;
		},
		selectedCharacterStore() {
			return this.$store.state.character.selectedCharacter;
		},
		alreadyInInitiativeOrder() {
			return (this.$store.state.character.initiative.filter((a) => a.id === this.selectedCharacter.id).length > 0);
		},
		playerID() {
			return this.$store.state.authentication.playerID;
		},
		isGM() {
			return this.$store.state.authentication.gm;
		}
	},
	watch: {
		selectedCharacterStore() {
			this.getSelectedCharacterByID();
		}
	},
	created() {
		this.getSelectedCharacterByID();
	},
	methods: {
		evaluateHPBox() {
			this.hp = evaluate(this.hp);
			this.saveCharacterDetailChanges();
		},
		openPlayersPopup() {
			this.$root.$emit("open-player-character-popup", this.selectedCharacter);
		},
		openConditionsPopup() {
			this.getSelectedCharacterByID();
			this.$root.$emit("open-character-conditions-popup", this.selectedCharacter);
		},
		saveCharacterDetailChanges() {
			setCharacterDetails(this.selectedCharacter.id, {
				hp: this.hp,
				ac: this.ac,
				notes: this.notes
			});
			setCharacterName(this.selectedCharacter.id, this.name);
		},
		openInitiativePrompt() {
			let initiative = prompt("Initiative value: ");
			if (Number.isNaN(parseInt(initiative)))
				return;
			store.commit("character/addCharacterToInitiative", {
				id: this.selectedCharacter.id,
				value: parseInt(initiative)
			});
		},
		getSelectedCharacterByID() {
			for (let character of this.characterStore.characters)
				if (character.id === this.characterStore.selectedCharacter) {
					this.selectedCharacter = character;
					if (character.details != null) {
						this.hp = character.details.hp;
						this.ac = character.details.ac;
						this.notes = character.details.notes;
					} else {
						this.hp = "0";
						this.ac = 0;
						this.notes = "";
					}
					this.name = character.name;
					break;
				}


			this.showStats = (this.isGM || this.selectedCharacter.players.map(player => player.id).includes(this.playerID));
		}
	}

};
</script>
