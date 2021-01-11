<template>
  <div>
    <div class="font-mono">
      <div
        v-for="log in commandResponseArray"
        :key="log.key"
        class="overflow-hidden bg-white text-black rounded mb-2"
      >
        <div
          v-for="line in log"
          class="p-2"
          :class="{'text-right' : !line.command, 'bg-blue-100': line.command}"
          :key="log.key">
          <span v-if="line.command">» {{line.value}}</span>
          <span v-else-if="line.type === 'roll-response'">
              <span
                  v-for="roll in JSON.parse(line.value)"
                  :key="roll.key"
              >
                  <span v-if="roll.type === 'n'" class="ml-2">{{roll.value}}</span>
                  <span v-else-if="roll.type === 'a'" class="block ml-2">
                      <span :class="{'text-green-500' : roll.value[0] >= roll.value[1]}">{{ roll.value[0] }}</span>
                      <span :class="{'text-green-500' : roll.value[0] <= roll.value[1]}">{{ roll.value[1] }}</span>
                  </span>
                  <span v-else-if="roll.type === 'm'" class="block ml-2">
                      <span :class="{'text-red-500' : roll.value[0] <= roll.value[1]}">{{ roll.value[0] }}</span>
                      <span :class="{'text-red-500' : roll.value[0] >= roll.value[1]}">{{ roll.value[1] }}</span>
                  </span>
              </span>
              <span class="block">
                  Sum = {{calculateSum(JSON.parse(line.value))}}
              </span>
          </span>
          <span v-else>{{line.value}}</span>
        </div>
      </div>
    </div>

    <div class="flex rounded-bottom">
      <input
        v-model="command"
        class="text-black flex-grow outline-none bg-white rounded p-2 font-mono"
        type="text"
        placeholder="Command input"
        @keypress.enter="execute"
      >
      <button
        class="flex justify-center items-center bg-white rounded text-black pr-1 ml-2 w-16"
        @click="execute"
      >
        <fa icon="arrow-right" class="w-4"/>
      </button>
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
    consoleLogs() {
      return this.$store.state.console.log;
    },
    commandResponseArray() {
      let consoleLogs = this.consoleLogs;
      let commandResponse = [];

      consoleLogs.forEach(log => {
        log.command = log.type === "command";

        if (log.command)
          commandResponse.push([log]);
        else
          commandResponse[commandResponse.length - 1].push(log);
      });

      return commandResponse;
    }
  },
  methods: {
    ...mapActions({
      executeCommand: "console/execute"
    }),
    execute() {
      this.executeCommand(this.command);
      this.command = "";
    },
    calculateSum(array) {
    	 let sum = 0;
    	 for (let obj of array) {
    	 	 if (obj.type === "n")
    	 	 	 sum += obj.value;
    	 	 else if (obj.type === "a")
    	 	 	 sum += Math.max(obj.value[0], obj.value[1]);
    	 	 else
    	 	 	 sum += Math.min(obj.value[0], obj.value[1]);
      }
    	 return sum;
    }
  },
};
</script>
<style>
.max-h-half {
  max-height: 50vh;
}
</style>
