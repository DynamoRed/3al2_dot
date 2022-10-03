import { ButtonInteraction, Client } from "discord.js";
import { EmbedsUtil } from "../utils/embeds.util";
import { IButton } from "../utils/interfaces/button.interface";

const button: IButton = {
    name: '5bL58S',
    execute(interaction: ButtonInteraction, app: Client) {
        interaction.reply({embeds: [EmbedsUtil.warning('🤔 Comment s\'enregister ?', [`**Premièrement**, utilisez la commande \`/register\` dans ${interaction.guild?.channels.cache.find(c => c.name === "nouveaux")}\n*(Si vous n'y connaissez rien aux commandes '/', vous pouvez [lire cela](https://discord.com/blog/slash-commands-are-here))*\n`, `Par la suite, vous allez recevoir une **clé de vérification** dans votre boite email [@myges.fr](https://cdn.dynamored.com/resources/esgi/2022_23/myges_inbox_tuto.pdf)\n`, `**Pour finir**, utilisez la commande \`/validate\` combinée a votre clé de vérification\n\n`, `*__Vous ne pouvez pas envoyer de message dans ce channel__. Si vous avez besoin d'aide, contactez <@324956349353951232> en MP*`])], ephemeral: true});
    },
}

module.exports = button;