import {getParameters} from "../plugins/utils/ParameterHelper";
import devices from "@/enums/devices";

export const state = () => ({
  device: getDevice()
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
