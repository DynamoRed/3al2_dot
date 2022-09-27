import { Client, Message, PermissionFlagsBits } from "discord.js";
import { Logging } from "../utils/logging.util";
import { Configuration } from "../utils/config.util";
import { IEvent } from "../utils/interfaces/event.interface";
import { EmbedsUtil } from "../utils/embeds.util";

const event: IEvent = {
    name: 'messageCreate',
    execute(app: Client, message: Message){

        if(new Configuration().getCommandsOnly(message.guildId || '').includes(message.channelId)){
            if(!message.member?.permissions.has(PermissionFlagsBits.Administrator)){
                Logging.loggingChannel?.send({embeds: [EmbedsUtil.info("🖊️ Blocked message", [`${message.author} try to send \`${message.content}\` in ${message.channel}`])]}).then(() => message.delete());
            }
        }
    }
}

module.exports = event;