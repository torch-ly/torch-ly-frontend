import {getParameters} from "../plugins/utils/ParameterHelper";

export const state = () => ({
  authID: getParameters().authID,
  playerID: null,
  name: null
})

export const mutations = {
  setPlayer(state, player) {
    state.playerID = player.id;
    state.name = player.name;
  }
}
