import {getParameters} from "../plugins/utils/ParameterHelper";
import {logError} from "@/plugins/backendComunication/backendComunication";

export const state = () => ({
  authID: getAuthID(),
  playerID: null,
  name: null,
  gm: false,
  canActivateGM: false
})

export function getAuthID() {
  let authID = getParameters().authID || localStorage["torch-ly-user"];
  if (authID) {
    localStorage["torch-ly-user"] = authID;
  }
  return authID;
}

export const mutations = {
  setPlayer(state, player) {
    state.playerID = player.id;
    state.name = player.name;
    state.gm = player.gm;
    state.canActivateGM = player.gm;
  },
  setAuthID(state, authID) {
    state.authID = authID;
    if (authID == "") {
      delete localStorage["torch-ly-user"];
    } else {
      localStorage["torch-ly-user"] = authID;
    }
  },
  setGM(state, value) {
    if (state.canActivateGM) {
      state.gm = value;
    } else {
      logError("Invalid attempt to change GM property")
    }
  }
}
