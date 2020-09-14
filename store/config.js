import {getParameters} from "../plugins/utils/ParameterHelper";
import devices from "@/enums/devices";

export const state = () => ({
  device: getDevice(),
  followDMScreen: false, //TODO implement to config page
  backendURL: localStorage["torch-ly-backend"] || process.env.BACKEND
})

function getDevice() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    return devices.MOBILE;
  else if (getParameters().hasOwnProperty("tv"))
    return devices.TV;
  else
    return devices.DEFAULT;
}

export const mutations = {
  setDevice(state, device) {
    state.device = device;
  }
}
