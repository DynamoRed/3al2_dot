import { ColorResolvable } from "discord.js";

export interface IAppConfigServersChannels {
	C_LOGS: string;
	C_REGISTER: string;
	C_DIARY: string;
	C_SUGGESTIONS: string;
}

export interface IAppConfig {
	informations: {
		name: string;
		version: string;
	};
	colors: {
		blurple: ColorResolvable;
		yellow: ColorResolvable;
		green: ColorResolvable;
		red: ColorResolvable;
		transparent: ColorResolvable;
	};
	credentials: {
		HOST: string;
		PORT: number;
		USER: string;
		DATABASE: string;
	};
	authorizedServers: string[];
	commandsOnlyChannels: any;
	serversChannels: any;
}