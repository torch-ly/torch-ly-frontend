<template>
    <div class="bg-background min-h-screen overflow-scroll">
        <h1 class="text-center text-black mb-4 mt-8 text-2xl font-bold select-none">
            Character overview of {{ $store.state.authentication.name }}
        </h1>

        <!-- character list -->
        <div class="bg-background h-auto w-full overflow-auto grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
            <MobileMovementCard
                v-for="character in ownCharacters"
                :key="character.id"
                :character="character"
            />
        </div>

        <!-- no characters -->
        <div
            v-if="ownCharacters.length === 0"
            class="text-center text-xl m-10 font-bold"
        >
            No Characters Loaded
        </div>
    </div>
</template>
<script>
import {store} from "@/logic/stage/main";
import MobileMovementCard from "./MobileMovementCard";

export default {
	components: {MobileMovementCard},
	computed: {
		ownCharacters() {
			return store.state.character.characters.filter(c => c.players.filter(p => p.id === store.state.authentication.playerID).length > 0);
		}
	}
};
</script>
