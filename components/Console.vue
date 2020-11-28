<template>
    <div>
        <div class="bg-white text-black rounded-top">
            <div
                v-for="log in consoleLog"
                :key="log.key"
            >
                <div
                    class="px-2"
                    :class="{'text-right' : log.type !== 'command'}"
                >
                    {{ log.value }}
                </div>
            </div>
        </div>

        <div class="flex bg-white rounded-bottom p-1">
            <input
                v-model="command"
                class="text-black flex-grow outline-none"
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
	computed: {
		consoleLog() {
			return this.$store.state.console.log;
		}
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
};
</script>
