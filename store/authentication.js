import {getParameters} from "../plugins/utils/ParameterHelper";

export const state = () => ({
  authID: getAuthID(),
  playerID: null,
  name: null,
  gm: false
})

function getAuthID() {
  let authID = getParameters().authID || localStorage["torch-ly-user"];
  localStorage["torch-ly-user"] = authID;
  return authID;
}

export const mutations = {
  setPlayer(state, player) {
    state.playerID = player.id;
    state.name = player.name;
    state.gm = player.gm
  }
}
