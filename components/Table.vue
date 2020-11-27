<template>
	<div id="table-div">
		<div
			id="container"
			@contextmenu="$event.preventDefault()"
			@drop.prevent="drop"
			@dragover.prevent=""
		/>
	</div>
</template>

<script>
import Konva from "konva";
import {main, stage} from "../logic/stage/main";
import {addCharacter} from "~/plugins/backendComunication/characters";
import {getRelativePointerPosition} from "@/logic/stage/functions/layerFunctions";
import {blockSnapSize} from "~/logic/stage/layers/grid/main";

export default {
	mounted() {
		let width = document.getElementById("table-div").offsetWidth;
		let height = document.getElementById("table-div").offsetHeight;
		let stage = new Konva.Stage({
			container: "container",
			width: width,
			height: height,
			draggable: true
		});
		main(stage, width, height);
	},
	methods: {
		drop(e) {
			let monster = JSON.parse(e.dataTransfer.getData("monster"));
			let imgUrl = e.dataTransfer.getData("imgUrl");
			let size;

			stage.setPointersPositions(e);

			let p = getRelativePointerPosition(stage);

			switch (monster.size) {
			case "L":
				size = 2;
				break;
			case "H":
				size = 3;
				break;
			case "G":
				size = 4;
				break;
			default:
				size = 1;
			}

			let ac = 0;
			if (Object.prototype.hasOwnProperty.call(monster, "ac"))
				if (monster.ac.length > 0 && monster.ac[0].ac)
					ac = monster.ac[0].ac;
				else
					ac = monster.ac;


			let character = {
				name: monster.name,
				token: imgUrl,
				pos: {
					point: {
						x: Math.floor(p.x / blockSnapSize),
						y: Math.floor(p.y / blockSnapSize)
					},
					size
				},
				player: [ this.$store.state.authentication.playerID ],
				details: {
					hp: Object.prototype.hasOwnProperty.call(monster, "hp") && Object.prototype.hasOwnProperty.call(monster, "average") ? monster.hp.average : 0,
					ac: ac,
					notes: ""
				}
			};

			addCharacter(character);
		}
	}
};
</script>
