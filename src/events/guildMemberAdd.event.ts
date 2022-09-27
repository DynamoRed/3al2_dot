import { Client, GuildMember } from "discord.js";
import { EmbedsUtil } from "../utils/embeds.util";
import { IEvent } from "../utils/interfaces/event.interface";
import { Logging } from "../utils/logging.util";

const event: IEvent = {
    name: 'guildMemberAdd',
    execute(app: Client, member: GuildMember){
		Logging.write(`~ Member join: ${member.user.tag}`);
        const visitorRole: any = member.guild?.roles.cache.find(r => r.name.toLowerCase().includes('visiteur'))?.id;
        member.roles.add(visitorRole, 'Onboarding');
        Logging.loggingChannel?.send({embeds: [EmbedsUtil.info("📥 New member", [`<@${member.user.id}> just join our server`])]})
    }
}

module.exports = event;