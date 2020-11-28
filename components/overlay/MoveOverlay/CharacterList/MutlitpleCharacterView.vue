<template>
    <div>
        <div
            v-for="character in getCharactersByPlayerID(playerID)"
            :key="character.key"
        >
            <div
                class="w-full flex flex-column my-4 justify-center items-center"
                @click="selectToken(character)"
            >
                <img
                    class="w-20 h-20 block"
                    draggable="false"
                    :src="character.token"
                >
                <div class="w-2/3 flex-col ml-2 pl-2 border-l-2 text-lg py-2">
                    <span
                        class="font-bold block"
                        :class="{'text-red-500' : $store.state.character.hoverOverCharacter === character.id}"
                    >{{ character.name }}</span>
                    <span class="block">{{ getPlayerNames(character) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {selectToken} from "@/logic/stage/functions/transformer/transformer";
import {getCharactersByPlayerID} from "@/plugins/utils/characterHelper";

export default {
	props: {
		playerID: {
			type: String,
			default: null
		}
	},
	methods: {
		getCharactersByPlayerID,
		selectToken,
		getPlayerNames(character) {
			let out = "";

			for (let player of character.players) 
				if (out === "")
					out += player.name;
				else
					out += ", " + player.name;
			


			return out;
		}
	}
};
</script>
