import { Logging, LogType } from "../utils/logging.util";
import { IEvent } from "../utils/interfaces/event.interface";
import { Client, GuildMember } from "discord.js";
import { EmbedsUtil } from "../utils/embeds.util";

const event: IEvent = {
    name: 'guildMemberRemove',
    execute(app: Client, member: GuildMember){
		Logging.write(`~ Member left: ${member.user.tag}`);
        Logging.loggingChannel?.send({embeds: [EmbedsUtil.info("📤 Member left", [`${member.user} just left our server`])]})
    }
}

module.exports = event;