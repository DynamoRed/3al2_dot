import { ButtonInteraction, Client } from "discord.js";
import { EmbedsUtil } from "../utils/embeds.util";
import { IButton } from "../utils/interfaces/button.interface";

const button: IButton = {
    name: 'u7Xm59',
    execute(interaction: ButtonInteraction, app: Client) {
        interaction.reply({embeds: [EmbedsUtil.warning('🤔 How to register ?', [`**First**, use the \`/register\` command in ${interaction.guild?.channels.cache.find(c => c.name === "nouveaux")}\n*(If you don't know how to use slash commands on discord, just [read that](https://discord.com/blog/slash-commands-are-here))*\n`, `Then you will receive a **verification key** in your [@myges.fr](https://cdn.dynamored.com/resources/esgi/2022_23/myges_inbox_tuto.pdf) email adress inbox\n`, `**Finally**, use the \`/validate\` command combined with your verification key\n\n`, `*__You cannot send messages in this channel__. If you need help, contact <@324956349353951232> in DM*`])], ephemeral: true});
    },
}

module.exports = button;