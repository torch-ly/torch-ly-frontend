<template>
	<div>

		<div>
			<div
				v-for="log in consoleLog"
				:key="log.key"
			>
				<div :class="{'text-right' : log.type !== 'command'}">{{log.value}}</div>
			</div>
		</div>

		<div class="flex bg-white rounded p-1">
			<input
				class="text-black flex-grow outline-none"
				v-model="command"
				type="text"
				placeholder="Command input"
				@keypress.enter="execute"
			>
			<div
				class="flex justify-center items-center text-black pr-1 pl-2"
				@click="execute"
			>
				<fa icon="arrow-right"	/>
			</div>
		</div>
	</div>
</template>
<script>
import {mapActions} from "vuex";

export default {
	data() {
		return {
			command: ""
		};
	},
	methods: {
		...mapActions({
			executeCommand: "console/execute"
		}),
		execute() {
			this.executeCommand(this.command);
			this.command = "";
		}
	},
	computed: {
		consoleLog() {
			return this.$store.state.console.log;
		}
	}
};
</script>
