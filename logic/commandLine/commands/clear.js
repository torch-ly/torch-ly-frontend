import {store} from "@/logic/stage/main";

export function clear() {
	store.commit("console/clearConsole");
}
