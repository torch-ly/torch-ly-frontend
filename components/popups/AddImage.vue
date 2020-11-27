<template>
	<PopupContainer
		ref="popupContainer"
		title="Add Shape or Image"
	>
		<form
			class="flex flex-col text-white"
			@submit.prevent=""
		>
			<!-- shape kind -->
			<select
				v-model="inputs.type"
				required
				class="dropdown"
			>
				<option class="p-2">
					Image
				</option>
				<option>Shape</option>
			</select>

			<div class="mb-4 hr" />

			<!-- URL option for image -->
			<div
				v-if="inputs.type === 'Image'"
				ref="image_part"
			>
				<!-- upload tool -->
				<div class="bg-highlight rounded p-2 mb-4">
					<p class="text-center font-bold mb-2">
						{{ uploadToolTitle }}
					</p>
					<FileUpload
						ref="imageupload"
						@upload-success="inputs.url = $event;"
					/>
				</div>

				<input
					v-model="inputs.url"
					type="url"
					placeholder="Image URL"
					class="input-field mb-4"
				>
			</div>

			<!-- Color chooser for shape option -->
			<div
				v-else
				class="mb-4"
			>
				<label
					for="color"
					class="inline-block"
				>Select Color:</label>
				<input
					id="color"
					v-model="inputs.color"
					class="h-6 ml-2 rounded inline-block"
					type="color"
					placeholder="Color"
				>
			</div>

			<AdvancedOptions class="mb-4 mt-2">
				<input
					ref="x"
					v-model="inputs.x"
					type="number"
					name="x"
					class="input-field mb-4"
					placeholder="X"
				>
				<input
					ref="y"
					v-model="inputs.y"
					type="number"
					name="y"
					class="input-field mb-4"
					placeholder="Y"
				>
				<input
					v-model="inputs.width"
					type="number"
					class="input-field mb-4"
					placeholder="Width"
				>
				<input
					v-model="inputs.height"
					type="number"
					class="input-field mb-4"
					placeholder="Height"
				>
				<!--input v-model="inputs.rotation" type="number" ref="rotation" name="rotation" class="input-field mb-4"
               placeholder="Rotation"-->


				<!-- snap to grid checkbox -->
				<div class="pb-4">
					<label
						for="snapToGrid"
						class="inline-block"
					>SnapToGrid:</label>
					<input
						id="snapToGrid"
						v-model="inputs.snapToGrid"
						type="checkbox"
						class="ml-2 inline-block"
					>
				</div>
			</AdvancedOptions>

			<button
				class="submit-button"
				type="submit"
				@click="addObject"
			>
				Insert
			</button>
		</form>
	</PopupContainer>
</template>
<script>
import PopupContainer from "../gui-components/PopupContainer";
import FileUpload from "../gui-components/FileUpload";
import AdvancedOptions from "../gui-components/AdvancedOptions";
import {loadImage, loadRect} from "../../logic/stage/layers/background/init";

export default {
	components: {AdvancedOptions, PopupContainer, FileUpload},
	data() {
		return {
			inputs: {
				url: "",
				x: "",
				y: "",
				width: "",
				height: "",
				rotation: "",
				snapToGrid: true,
				type: "Image",
				color: "#000000"
			}
		};
	},
	computed: {
		uploadToolTitle() {
			return this.inputs.url.includes(process.env.IMAGE_SERVER) ? "Generated URL" : "Upload-Tool";
		}
	},
	mounted() {
		this.$root.$on("open-image-popup", () => {
			this.$refs.popupContainer.active = true;
		});
		this.$root.$on("close-image-popup", () => {
			this.$refs.popupContainer.active = false;
		});
	},
	methods: {
		addObject() {
			if (this.inputs.type === "Image")
				loadImage({
					"pos": {
						"x": parseInt(this.inputs.x || "0"),
						"y": parseInt(this.inputs.y || "0"),
						"width": parseInt(this.inputs.width || "120"),
						"height": parseInt(this.inputs.height || "120"),
					},
					"draggable": true,
					"snapToGrid": this.inputs.snapToGrid,
					"type": "rect",
					"src": this.inputs.url,
					"rotation": parseInt(this.inputs.rotation || "0"),
					"color": this.inputs.color,
				});
			else
				loadRect({
					"pos": {
						"x": parseInt(this.inputs.x || "0"),
						"y": parseInt(this.inputs.y || "0"),
						"width": parseInt(this.inputs.width || "120"),
						"height": parseInt(this.inputs.height || "120"),
					},
					"draggable": true,
					"snapToGrid": this.inputs.snapToGrid,
					"type": "rect",
					"src": this.inputs.url,
					"rotation": parseInt(this.inputs.rotation || "0"),
					"color": this.inputs.color,
				});

			this.$root.$emit("close-image-popup");
		},
	}
};
</script>
<style scoped lang="scss">
  @import "assets/css/scheme";
</style>
{
"pos": {
"x": object.x(),
"y": object.y(),
"width": object.width() * object.getTransform().getMatrix()[0],
"height": object.height() * object.getTransform().getMatrix()[3]
},
"snapToGrid": object.snapToGrid,
"type": "rect",
"color": object.fill(),
"rotation": object.rotation()
}
