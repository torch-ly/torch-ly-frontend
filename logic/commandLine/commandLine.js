import {commandPattern} from "@/logic/commandLine/helperFunctions";
import {roll} from "@/logic/commandLine/commands/roll";
import {clear} from "@/logic/commandLine/commands/clear";

export function parseCommand(command) {

	command = command.toLocaleString();

	commandPattern(command, roll, "/roll", "/r" );

	commandPattern(command, clear, "/clear" );

}
