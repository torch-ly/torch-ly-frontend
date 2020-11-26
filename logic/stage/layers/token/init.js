import Konva from "konva";
import {addSnapToGridListener} from "../../functions/layerFunctions";
import {store} from "../../main";
import {blockSnapSize} from "../grid/main";
import {draw, out, setOut} from "@/logic/stage/layers/token/main";
import {addTransformerClickListener} from "../../functions/transformer/transformer";
import {removeCharacter, setCharacterPosition} from "../../../../plugins/backendComunication/characters";
import {addTransformationListener} from "@/logic/stage/functions/transformer/transformer";
import devices from "@/enums/devices";
import {loadConditionImages, updateConditionImagePosition} from "@/logic/stage/layers/token/conditions";


export function init() {

	setOut([]);

	let characters = store.state.character.characters;

	if (store.state.config.device === devices.MOBILE)
		return;

	characters.forEach(character => loadImage(character));
}

export function loadImage(character) {
	let imageObj = new Image(character.pos.size * blockSnapSize, character.pos.size * blockSnapSize);

	imageObj.onerror = () => {
		imageObj.src = "/no-image.jpg";
	};

	imageObj.onload = function () {
		let image = new Konva.Image({
			x: Math.floor(character.pos.point.x * blockSnapSize),
			y: Math.floor(character.pos.point.y * blockSnapSize),
			image: imageObj,
			rotation: character.pos.rot,
			id: String(character.id)
		});

		image.x(image.x() + image.width() / 2);
		image.y(image.y() + image.height() / 2);

		image.offsetX(image.width() / 2);
		image.offsetY(image.height() / 2);

		image.snapToGrid = true;
		image.characterID = character.id;
		image.on("dragend", () => {
			setCharacterPosition(image.characterID, {
				x: Math.round((image.x() - image.width() / 2) / blockSnapSize),
				y: Math.round((image.y() - image.height() / 2) / blockSnapSize)
			});
		});

		image.conditions = [];
		loadConditionImages(image, {x: image.x(), y: image.y(), width: image.width()}, character.conditions || []);

		image.on("dragmove", () => {
			updateConditionImagePosition(image.conditions, {
				x: image.x(),
				y: image.y(),
				width: image.width()
			}, character.conditions || []);
		});

		image.removeElement = () => {
			removeCharacter(image.characterID);
		};

		image.on("mouseenter", () => {
			store.commit("character/setHoverOverCharacter", image.characterID);
		});

		image.on("mouseleave", () => {
			store.commit("character/setHoverOverCharacter", null);
		});

		addTransformerClickListener(image);

		addSnapToGridListener([ image ]);

		addTransformationListener(image);

		out.push(image);
		draw(out);
	};
	imageObj.src = character.token;
}


export function removeKonvaCharacter(characterID) {
	for (let i = 0; i < out.length; i++)
		if (out[i].characterID === characterID) {
			out.splice(i, 1);
			draw(out);
			return;
		}

}
