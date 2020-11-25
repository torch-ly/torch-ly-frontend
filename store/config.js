import {getParameters} from "../plugins/utils/ParameterHelper";
import devices from "@/enums/devices";

export const state = () => ({
	device: getDevice(),
	followDMScreen: false, //TODO implement to config page
	backendURL: getBackendUrl()
});

if (getDevice() !== devices.MOBILE)
	setThemeColor();

function setThemeColor() {
	let metaThemeColor = document.querySelector("meta[name=theme-color]");
	metaThemeColor.setAttribute("content", "#4A5568");
}

export function getBackendUrl() {
	let backend = getParameters().backend || localStorage["torch-ly-backend"] || process.env.BACKEND;
	localStorage["torch-ly-backend"] = backend;
	return backend;
}

function getDevice() {
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
		return devices.MOBILE;
	else if (Object.prototype.hasOwnProperty.call(getParameters(), "tv"))
		return devices.TV;
	else
		return devices.DEFAULT;
}

export const mutations = {
	setDevice(state, device) {
		state.device = device;
	}
};
