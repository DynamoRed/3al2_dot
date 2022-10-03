import { Client, GuildMember, TextChannel } from "discord.js";
import { EmbedsUtil } from "../utils/embeds.util";
import { IEvent } from "../utils/interfaces/event.interface";
import { Logging } from "../utils/logging.util";

const event: IEvent = {
    name: 'guildMemberAdd',
    execute(app: Client, member: GuildMember){
		Logging.write(`~ Member join: ${member.user.tag}`);
        const visitorRole: any = member.guild?.roles.cache.find(r => r.name.toLowerCase() === 'visiteur')?.id;
        const newbiesChannel: any = member.guild?.channels.cache.find(c => c.name === "nouveaux");
        const convertedChannel: TextChannel = newbiesChannel;
        setTimeout(() => {
            member.roles.add(visitorRole, 'Onboarding');
            Logging.loggingChannel?.send({embeds: [EmbedsUtil.info("📥 New member", [`${member.user} just join our server`])]});
            convertedChannel?.send(`${member.user}`).then(message => setTimeout(() => message.delete(), 200));
        }, 500);
    }
}

module.exports = event;