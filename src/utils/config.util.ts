import { IAppConfig, IAppConfigServersChannels } from "./interfaces/app.config.interface";
import fs from 'fs';

export class Configuration {
	private _appConfig: IAppConfig;

	constructor(){
		this._appConfig = JSON.parse(fs.readFileSync('./src/config/app.config.json').toString());
	}

	get name(){
		return this._appConfig.informations.name;
	}

	get version(){
		return this._appConfig.informations.version;
	}

	get credentials(){
		return this._appConfig.credentials;
	}

	get authorizedServers(){
		return this._appConfig.authorizedServers;
	}

	public getCommandsOnly(gid: string): string[]{
		return this._appConfig.commandsOnlyChannels[gid] || [];
	}

	public getChannels(gid: string): IAppConfigServersChannels {
		return this._appConfig.serversChannels[gid] || [];
	}
}