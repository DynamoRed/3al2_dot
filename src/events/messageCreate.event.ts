import { Client, Message, PermissionFlagsBits } from "discord.js";
import { IEvent } from "../utils/interfaces/event.interface";

const event: IEvent = {
    name: 'messageCreate',
    execute(app: Client, message: Message){
        if(message.channelId === '988381575018348556'){
            if(!message.member?.permissions.has(PermissionFlagsBits.Administrator)){
                message.delete();
            }
        }
    }
}

module.exports = event;