<template>
    <div class="bg-primary text-white  mb-0 rounded-lg shadow-lg h-auto select-none noDoubleTapZoom">
        <div class="w-full flex flex-column justify-center">
            <img
                class="w-48 h-48 p-4 mr-0"
                :src="character.token"
            >
            <p class="p-4 flex text-lg md:text-xl items-center text-left">
                {{ character.name }}
            </p>
        </div>

        <div class="grid gap-3 grid-cols-3 text-center p-3">
            <!-- Create arrows for movement-control -->
            <div
                v-for="(arrow, index) in arrows"
                :key="arrow.id"
                class="flex justify-center items-center hover:bg-accent active:bg-accent rounded-full h-12"
                @click="click(index, character)"
            >
                <fa
                    v-if="index !== 4"
                    :icon="arrow"
                    class="text-white text-3xl w-4 h-4"
                    :class="{'rotate-45': [0,2,6,8].includes(index)}"
                />

                <div v-else>
                    <p class="text-2xl select-none">
                        {{ displacement }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {setCharacterPosition} from "@/plugins/backendComunication/characters";

export default {
	props: {
		character: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			displacement: 0,
			moves: [],
			arrows: [ "angle-left", "angle-up", "angle-up", "angle-left", "dot-circle", "angle-right", "angle-down", "angle-down", "angle-right" ]
		};
	},
	methods: {
		click(index, character) {
			if (window.navigator.vibrate)
				window.navigator.vibrate(40);

			let pos = {
				x: character.pos.point.x,
				y: character.pos.point.y
			};
			switch (index) {
			case 0:
				setCharacterPosition(character.id, {
					x: pos.x - 1,
					y: pos.y - 1
				});
				break;
			case 1:
				setCharacterPosition(character.id, {
					x: pos.x,
					y: pos.y - 1
				});
				break;
			case 2:
				setCharacterPosition(character.id, {
					x: pos.x + 1,
					y: pos.y - 1
				});
				break;
			case 3:
				setCharacterPosition(character.id, {
					x: pos.x - 1,
					y: pos.y
				});
				break;
			case 4:
				if (window.navigator.vibrate)
					navigator.vibrate([ 50, 10, 50, 10, 50 ]);
				break;
			case 5:
				setCharacterPosition(character.id, {
					x: pos.x + 1,
					y: pos.y
				});
				break;
			case 6:
				setCharacterPosition(character.id, {
					x: pos.x - 1,
					y: pos.y + 1
				});
				break;
			case 7:
				setCharacterPosition(character.id, {
					x: pos.x,
					y: pos.y + 1
				});
				break;
			case 8:
				setCharacterPosition(character.id, {
					x: pos.x + 1,
					y: pos.y + 1
				});
				break;
			}
			if (index === 4)
				this.moves = [];
			else if (index + this.moves[this.moves.length - 1] === 8)
				this.moves.pop();
			else
				this.moves.push(index);

			this.displacement = this.moves.length * 5;

		},
	}
};
</script>
<style scoped>
.rotate-45 {
  transform: rotate(45deg);
}
.noDoubleTapZoom {
	touch-action: manipulation;
}

</style>
